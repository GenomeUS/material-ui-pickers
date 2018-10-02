import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import Calendar from './components/Calendar';
import YearSelection from './components/YearSelection';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DomainPropTypes from '../constants/prop-types';
import withUtils from '../_shared/WithUtils';

export class DatePicker extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
    children: PropTypes.node,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
    allowKeyboardControl: PropTypes.bool,
    clearable: PropTypes.bool,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    allowKeyboardControl: false,
    animateYearScrolling: undefined,
    openToYearSelection: false,
    children: null,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    shouldDisableDate: undefined,
    clearable: false,
    onClose: () => {},
    onAccept: () => {},
  }

  state = {
    showYearSelection: this.props.openToYearSelection,
  }

  get date() {
    return this.props.utils.startOfDay(this.props.date);
  }

  get minDate() {
    return this.props.utils.date(this.props.minDate);
  }

  get maxDate() {
    return this.props.utils.date(this.props.maxDate);
  }

  handleYearSelect = (date) => {
    this.props.onChange(date, false);
    this.openCalendar();
  }

  openYearSelection = () => {
    this.setState({ showYearSelection: true });
  }

  openCalendar = () => {
    this.setState({ showYearSelection: false });
  }

  render() {
    const {
      disablePast,
      disableFuture,
      onChange,
      animateYearScrolling,
      leftArrowIcon,
      rightArrowIcon,
      renderDay,
      utils,
      shouldDisableDate,
      allowKeyboardControl,
      startDate,
      endDate,
      clearable,
      onClose,
      onAccept,
    } = this.props;
    const { showYearSelection } = this.state;

    return (
      <Fragment>
        <PickerToolbar>
          <ToolbarButton
            variant="subheading"
            onClick={this.openYearSelection}
            selected={showYearSelection}
            label={utils.getYearText(this.date)}
          />

          <ToolbarButton
            variant="display1"
            onClick={this.openCalendar}
            selected={!showYearSelection}
            label={utils.getDatePickerHeaderText(this.date)}
          />
        </PickerToolbar>

        { this.props.children }

        {
          showYearSelection
            ? (
              <YearSelection
                date={this.date}
                onChange={this.handleYearSelect}
                minDate={this.minDate}
                maxDate={this.maxDate}
                disablePast={disablePast}
                disableFuture={disableFuture}
                animateYearScrolling={animateYearScrolling}
                utils={utils}
              />
            )
            : (
              <Calendar
                date={this.date}
                onChange={onChange}
                disablePast={disablePast}
                disableFuture={disableFuture}
                minDate={this.minDate}
                maxDate={this.maxDate}
                leftArrowIcon={leftArrowIcon}
                rightArrowIcon={rightArrowIcon}
                renderDay={renderDay}
                utils={utils}
                shouldDisableDate={shouldDisableDate}
                allowKeyboardControl={allowKeyboardControl}
                startDate={startDate}
                endDate={endDate}
              />
            )
        }
        <DialogActions
          style={{
            diplay: 'flex',
            alignItems: 'center',
          }}
        >
          {
            clearable
            && (
            <Button
              color="primary"
              onClick={() => {}}
              aria-label="Clear"
            >
              { 'Clear' }
            </Button>
            )
          }

          <Button
            color="primary"
            onClick={onClose}
            aria-label="Cancel"
            style={{
              margin: 0,
              color: 'black',
            }}
          >
            { 'Cancel' }
          </Button>

          <Button
            color="primary"
            onClick={onAccept}
            aria-label="OK"
            style={{
              margin: 0,
            }}
          >
            { 'OK' }
          </Button>
        </DialogActions>
      </Fragment>
    );
  }
}

export default withUtils()(DatePicker);
