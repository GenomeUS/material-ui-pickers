/* eslint-disable react/prop-types */

import * as React from 'react';
import withUtils from './WithUtils';

const getInitialDate = ({ utils, value, initialFocusedDate }, dateToParse) => {
  const initialDate = dateToParse || value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return utils.isValid(date) ? date : utils.date();
};

class RangeBasePicker extends React.Component {
  state = {
    date: getInitialDate(this.props, new Date()),
    startDate: getInitialDate(this.props, this.props.startDate),
    endDate: getInitialDate(this.props, this.props.endDate),
    isAccepted: false,
  };

  componentDidUpdate(prevProps) {
    const { utils, startDate, endDate } = this.props;
    if (prevProps.startDate !== startDate || prevProps.utils.locale !== utils.locale) {
      this.changeStartDate(getInitialDate(this.props, startDate));
    }
    if (prevProps.endDate !== endDate || prevProps.utils.locale !== utils.locale) {
      this.changeEndDate(getInitialDate(this.props, endDate));
    }
  }

  changeStartDate = (startDate, callback) => this.setState({ startDate }, callback);

  changeEndDate = (endDate, callback) => this.setState({ endDate }, callback);

  handleAcceptedChange = (isAccepted, callback) => this.setState({ isAccepted }, callback);

  handleClear = () => this.props.onChange(null);

  handleAccept = () => this.props.onChange(this.state.date);

  handleSetTodayDate = () => this.changeDate(this.props.utils.date());

  handleTextFieldChange = (date) => {
    const { onChange } = this.props;
    if (date === null) {
      onChange(null);
    } else {
      this.changeDate(date, () => onChange(date));
    }
  };

  pick12hOr24hFormat = (default12hFormat, default24hFormat) => {
    const { format, labelFunc, ampm } = this.props;
    if (format || labelFunc) {
      return format;
    }

    return ampm ? default12hFormat : default24hFormat;
  };

  handleChange = (newDate, isFinish = true) => {
    const { handleAcceptedChange, changeDate } = this;
    const { autoOk, onChange } = this.props;
    changeDate(newDate, () => {
      if (isFinish && autoOk) {
        onChange(newDate);
        // pass down accept true, and make it false in the next tick
        handleAcceptedChange(true, () => handleAcceptedChange(false));
      }
    });
  };

  render() {
    const {startDate, endDate} = this.props;
    return this.props.children({
      ...this.props,
      ...this.state,
      changeDate: this.changeDate,
      handleAcceptedChange: this.handleAcceptedChange,
      handleClear: this.handleClear,
      handleAccept: this.handleAccept,
      handleSetTodayDate: this.handleSetTodayDate,
      handleTextFieldChange: this.handleTextFieldChange,
      pick12hOr24hFormat: this.pick12hOr24hFormat,
      handleChange: this.handleChange,
    });
  }
}

export default withUtils()(RangeBasePicker);
