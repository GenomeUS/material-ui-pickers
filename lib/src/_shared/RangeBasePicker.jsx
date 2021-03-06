/* eslint-disable react/prop-types */

import * as React from 'react';
import withUtils from './WithUtils';

const getInitialDate = ({ utils, initialFocusedDate }, dateToParse) => {
  const initialDate = dateToParse || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return utils.isValid(date) ? date : utils.date();
};

class RangeBasePicker extends React.Component {
  state = {
    date: getInitialDate(this.props, new Date()),
    dateToChange: 'startDate',
    startDate: null,
    endDate: null,
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

  getNextDateToChange = (dateToChange) => {
    if (dateToChange === 'startDate') {
      return 'endDate';
    }
    return 'startDate';
  }

  changeDate = (date, callback) => {
    const { dateToChange, startDate } = this.state;
    if (!date) {
      return -1;
    }
    if (startDate && date.isBefore(startDate) && dateToChange === 'endDate') {
      this.setState({
        startDate: date,
        endDate: null,
        date,
      }, callback);
      return 0;
    }
    if (dateToChange === 'startDate') {
      this.setState({
        startDate: date,
        endDate: null,
        date,
        dateToChange: 'endDate',
      }, callback);
    } else {
      this.setState({
        endDate: date,
        date,
        dateToChange: 'startDate',
      }, callback);
    }
    return 0;
  }

  resetDates = () => {
    const { startDate, endDate } = this.props;
    this.setState({
      startDate: startDate ? getInitialDate(this.props, startDate) : null,
      endDate: endDate ? getInitialDate(this.props, endDate) : null,
    });
  }


  changeStartDate = (startDate, callback) => this.setState({ startDate }, callback);

  changeEndDate = (endDate, callback) => this.setState({ endDate }, callback);

  handleAcceptedChange = (isAccepted, callback) => this.setState({ isAccepted }, callback);

  handleClear = () => { this.resetDates(); };

  handleAccept = () => this.props.onChange(this.state.startDate, this.state.endDate);


  handleTextFieldChange = (date) => {
    const { onChange } = this.props;
    if (date === null) {
      onChange(null);
    } else {
      this.changeDate(date);
    }
  };

  pick12hOr24hFormat = (default12hFormat, default24hFormat) => {
    const { format, labelFunc, ampm } = this.props;
    if (format || labelFunc) {
      return format;
    }

    return ampm ? default12hFormat : default24hFormat;
  };

  handleChange = (newDate) => {
    const { handleAcceptedChange, changeDate } = this;
    const { autoOk, onChange } = this.props;
    changeDate(newDate, () => {
      if (autoOk) {
        onChange(newDate);
        // pass down accept true, and make it false in the next tick
        handleAcceptedChange(true, () => handleAcceptedChange(false));
      }
    });
  };

  render() {
    return this.props.children({
      ...this.props,
      ...this.state,
      changeDate: this.changeDate,
      handleAcceptedChange: this.handleAcceptedChange,
      handleClear: this.handleClear,
      handleAccept: this.handleAccept,
      handleSetTodayDate: () => {},
      handleTextFieldChange: this.handleTextFieldChange,
      pick12hOr24hFormat: this.pick12hOr24hFormat,
      handleChange: this.handleChange,
    });
  }
}

export default withUtils()(RangeBasePicker);
