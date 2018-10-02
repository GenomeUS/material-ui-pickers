import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import DomainPropTypes from '../constants/prop-types';
import MaskedInput from './MaskedInput';
import withUtils from './WithUtils';

const getDisplayDate = (props) => {
  const {
    utils, startDate, endDate, format, invalidLabel, emptyLabel,
  } = props;

  const isEmpty = (startDate === null || endDate === null);
  const startDateConverted = utils.date(startDate);
  const endDateConverted = utils.date(endDate);

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(startDateConverted) && utils.isValid(endDateConverted)
    ? `${utils.format(startDateConverted, format)} - ${utils.format(endDateConverted, format)}`
    : invalidLabel;
};

const getError = (date, props) => {
  const {
    utils,
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  } = props;

  if (!utils || !date) {
    return '';
  }

  if (!utils.isValid(date)) {
    // if null - do not show error
    if (utils.isNull(date)) {
      return '';
    }

    return invalidDateMessage;
  }

  if (
    (maxDate && utils.isAfter(date, utils.endOfDay(utils.date(maxDate))))
    || (disableFuture && utils.isAfter(date, utils.endOfDay(utils.date())))
  ) {
    return maxDateMessage;
  }

  if (
    (minDate && utils.isBefore(date, utils.startOfDay(utils.date(minDate))))
    || (disablePast && utils.isBefore(date, utils.startOfDay(utils.date())))
  ) {
    return minDateMessage;
  }

  return '';
};

const getErrors = (dates = [], props) => {
  const errors = [];
  dates.forEach((date) => {
    const error = getError(date, props);
    if (error && error !== '') {
      errors.push(error);
    }
  });
  if (errors.length === 0) {
    return '';
  }
  return errors[0];
};

export class RangeDateTextField extends PureComponent {
  static updateState = props => ({
    value: props.value,
    displayValue: getDisplayDate(props),
    error: getErrors([props.startDate, props.endDate], props),
  });

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    format: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    clearable: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    InputProps: PropTypes.shape(),
    /** Input mask, used in keyboard mode read more <a href="https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme">here</a> */
    mask: PropTypes.any,
    /** Error message, shown if date is less then minimal date */
    minDateMessage: PropTypes.node,
    /** Error message, shown if date is more then maximal date */
    maxDateMessage: PropTypes.node,
    /** Message displaying in text field, if date is invalid (doesn't work in keyboard mode) */
    invalidLabel: PropTypes.string,
    /** Message displaying in text field, if null passed (doesn't work in keyboard mode) */
    emptyLabel: PropTypes.string,
    /** Dynamic label generation function [(date: Date, invalidLabel: string) => string] */
    labelFunc: PropTypes.func,
    /** On/off manual keyboard input mode */
    keyboard: PropTypes.bool,
    /** Icon displayed for open picker button in keyboard mode */
    keyboardIcon: PropTypes.node,
    /** enables/disable automatic opening of the picker when the user clicks enter */
    disableOpenOnEnter: PropTypes.bool,
    /** Message, appearing when date cannot be parsed */
    invalidDateMessage: PropTypes.node,
    /** Component that should replace the default Material-UI TextField */
    TextFieldComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** Props to pass to keyboard input adornment */
    InputAdornmentProps: PropTypes.object,
    /** Specifies position of keyboard button adornment */
    adornmentPosition: PropTypes.oneOf(['start', 'end']),
    /** Callback firing when date that applied in the keyboard is invalid
     *  [(error: string) => void]
    */
    onError: PropTypes.func,
    /** Callback firing on change input in keyboard mode [(e: Event) => void] */
    onInputChange: PropTypes.func,
    pipe: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    emptyLabel: '',
    value: new Date(),
    labelFunc: undefined,
    format: undefined,
    InputProps: undefined,
    keyboard: false,
    mask: undefined,
    keyboardIcon: 'event',
    disableOpenOnEnter: false,
    invalidDateMessage: 'Invalid Date Format',
    clearable: false,
    onBlur: undefined,
    onClear: undefined,
    disablePast: false,
    disableFuture: false,
    onError: undefined,
    onInputChange: undefined,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    minDateMessage: 'Date should not be before minimal date',
    maxDateMessage: 'Date should not be after maximal date',
    TextFieldComponent: TextField,
    InputAdornmentProps: {},
    adornmentPosition: 'end',
    pipe: undefined,
  }

  state = RangeDateTextField.updateState(this.props)

  componentDidUpdate(prevProps) {
    if (
      !this.props.utils.isEqual(this.props.startDate, prevProps.startDate)
      || !this.props.utils.isEqual(this.props.endDate, prevProps.endDate)
      || prevProps.format !== this.props.format
      || prevProps.maxDate !== this.props.maxDate
      || prevProps.minDate !== this.props.minDate
      || prevProps.emptyLabel !== this.props.emptyLabel
      || prevProps.utils !== this.props.utils
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState(RangeDateTextField.updateState(this.props));
    }
  }

  handleBlur = () => {

  };

  handleChange = (e) => {
  }

  handleFocus = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!this.props.keyboard) {
      this.openPicker(e);
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!this.props.disableOpenOnEnter) {
        this.openPicker(e);
      }
    }
  }

  openPicker = (e) => {
    const { disabled, onClick } = this.props;

    if (!disabled) {
      onClick(e);
    }
  }

  render() {
    const {
      adornmentPosition,
      clearable,
      disabled,
      disableFuture,
      disableOpenOnEnter,
      disablePast,
      emptyLabel,
      format,
      InputAdornmentProps,
      InputProps,
      invalidDateMessage,
      invalidLabel,
      keyboard,
      keyboardIcon,
      labelFunc,
      mask,
      maxDate,
      maxDateMessage,
      minDate,
      minDateMessage,
      onBlur,
      onClear,
      onClick,
      pipe,
      TextFieldComponent,
      utils,
      value,
      onInputChange,
      ...other
    } = this.props;

    const { displayValue, error } = this.state;
    const localInputProps = {
      inputComponent: MaskedInput,
      inputProps: {
        mask: !keyboard ? null : mask,
        pipe: !keyboard ? null : pipe,
        readOnly: !keyboard,
      },
    };

    localInputProps[`${adornmentPosition}Adornment`] = (
      <InputAdornment
        position={adornmentPosition}
        {...InputAdornmentProps}
      >
        <IconButton
          disabled={disabled}
          onClick={this.openPicker}
        >
          <Icon>
            {' '}
            {keyboardIcon}
            {' '}
          </Icon>
        </IconButton>
      </InputAdornment>
    );


    return (
      <TextFieldComponent
        onClick={this.handleFocus}
        error={!!error}
        helperText={error}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        disabled={disabled}
        value={displayValue}
        {...other}
        onChange={this.handleChange}
        InputProps={{ ...localInputProps, ...InputProps }}
      />
    );
  }
}

export default withUtils()(RangeDateTextField);
