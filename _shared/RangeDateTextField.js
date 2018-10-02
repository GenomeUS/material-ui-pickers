"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.RangeDateTextField = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _propTypes2 = _interopRequireDefault(require("../constants/prop-types"));

var _MaskedInput = _interopRequireDefault(require("./MaskedInput"));

var _WithUtils = _interopRequireDefault(require("./WithUtils"));

var getDisplayDate = function getDisplayDate(props) {
  var utils = props.utils,
      startDate = props.startDate,
      endDate = props.endDate,
      format = props.format,
      invalidLabel = props.invalidLabel,
      emptyLabel = props.emptyLabel;
  var isEmpty = startDate === null || endDate === null;
  var startDateConverted = utils.date(startDate);
  var endDateConverted = utils.date(endDate);

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(startDateConverted) && utils.isValid(endDateConverted) ? utils.format(startDateConverted, format) + " - " + utils.format(endDateConverted, format) : invalidLabel;
};

var getError = function getError(date, props) {
  var utils = props.utils,
      maxDate = props.maxDate,
      minDate = props.minDate,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      maxDateMessage = props.maxDateMessage,
      minDateMessage = props.minDateMessage,
      invalidDateMessage = props.invalidDateMessage;

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

  if (maxDate && utils.isAfter(date, utils.endOfDay(utils.date(maxDate))) || disableFuture && utils.isAfter(date, utils.endOfDay(utils.date()))) {
    return maxDateMessage;
  }

  if (minDate && utils.isBefore(date, utils.startOfDay(utils.date(minDate))) || disablePast && utils.isBefore(date, utils.startOfDay(utils.date()))) {
    return minDateMessage;
  }

  return '';
};

var getErrors = function getErrors(dates, props) {
  if (dates === void 0) {
    dates = [];
  }

  var errors = [];
  dates.forEach(function (date) {
    var error = getError(date, props);

    if (error && error !== '') {
      errors.push(error);
    }
  });

  if (errors.length === 0) {
    return '';
  }

  return errors[0];
};

var RangeDateTextField =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(RangeDateTextField, _PureComponent);

  function RangeDateTextField() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = RangeDateTextField.updateState(_this.props);

    _this.handleBlur = function () {};

    _this.handleChange = function (e) {};

    _this.handleFocus = function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (!_this.props.keyboard) {
        _this.openPicker(e);
      }
    };

    _this.handleKeyPress = function (e) {
      if (e.key === 'Enter') {
        if (!_this.props.disableOpenOnEnter) {
          _this.openPicker(e);
        }
      }
    };

    _this.openPicker = function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick;

      if (!disabled) {
        onClick(e);
      }
    };

    return _this;
  }

  var _proto = RangeDateTextField.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.props.utils.isEqual(this.props.startDate, prevProps.startDate) || !this.props.utils.isEqual(this.props.endDate, prevProps.endDate) || prevProps.format !== this.props.format || prevProps.maxDate !== this.props.maxDate || prevProps.minDate !== this.props.minDate || prevProps.emptyLabel !== this.props.emptyLabel || prevProps.utils !== this.props.utils) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState(RangeDateTextField.updateState(this.props));
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        adornmentPosition = _this$props2.adornmentPosition,
        clearable = _this$props2.clearable,
        disabled = _this$props2.disabled,
        disableFuture = _this$props2.disableFuture,
        disableOpenOnEnter = _this$props2.disableOpenOnEnter,
        disablePast = _this$props2.disablePast,
        emptyLabel = _this$props2.emptyLabel,
        format = _this$props2.format,
        InputAdornmentProps = _this$props2.InputAdornmentProps,
        InputProps = _this$props2.InputProps,
        invalidDateMessage = _this$props2.invalidDateMessage,
        invalidLabel = _this$props2.invalidLabel,
        keyboard = _this$props2.keyboard,
        keyboardIcon = _this$props2.keyboardIcon,
        labelFunc = _this$props2.labelFunc,
        mask = _this$props2.mask,
        maxDate = _this$props2.maxDate,
        maxDateMessage = _this$props2.maxDateMessage,
        minDate = _this$props2.minDate,
        minDateMessage = _this$props2.minDateMessage,
        onBlur = _this$props2.onBlur,
        onClear = _this$props2.onClear,
        onClick = _this$props2.onClick,
        pipe = _this$props2.pipe,
        TextFieldComponent = _this$props2.TextFieldComponent,
        utils = _this$props2.utils,
        value = _this$props2.value,
        onInputChange = _this$props2.onInputChange,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["adornmentPosition", "clearable", "disabled", "disableFuture", "disableOpenOnEnter", "disablePast", "emptyLabel", "format", "InputAdornmentProps", "InputProps", "invalidDateMessage", "invalidLabel", "keyboard", "keyboardIcon", "labelFunc", "mask", "maxDate", "maxDateMessage", "minDate", "minDateMessage", "onBlur", "onClear", "onClick", "pipe", "TextFieldComponent", "utils", "value", "onInputChange"]);
    var _this$state = this.state,
        displayValue = _this$state.displayValue,
        error = _this$state.error;
    var localInputProps = {
      inputComponent: _MaskedInput.default,
      inputProps: {
        mask: !keyboard ? null : mask,
        pipe: !keyboard ? null : pipe,
        readOnly: !keyboard
      }
    };
    localInputProps[adornmentPosition + "Adornment"] = _react.default.createElement(_InputAdornment.default, (0, _extends2.default)({
      position: adornmentPosition
    }, InputAdornmentProps), _react.default.createElement(_IconButton.default, {
      disabled: disabled,
      onClick: this.openPicker
    }, _react.default.createElement(_Icon.default, null, ' ', keyboardIcon, ' ')));
    return _react.default.createElement(TextFieldComponent, (0, _extends2.default)({
      onClick: this.handleFocus,
      error: !!error,
      helperText: error,
      onKeyPress: this.handleKeyPress,
      onBlur: this.handleBlur,
      disabled: disabled,
      value: displayValue
    }, other, {
      onChange: this.handleChange,
      InputProps: (0, _extends2.default)({}, localInputProps, InputProps)
    }));
  };

  return RangeDateTextField;
}(_react.PureComponent);

exports.RangeDateTextField = RangeDateTextField;

RangeDateTextField.updateState = function (props) {
  return {
    value: props.value,
    displayValue: getDisplayDate(props),
    error: getErrors([props.startDate, props.endDate], props)
  };
};

RangeDateTextField.defaultProps = {
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
  TextFieldComponent: _TextField.default,
  InputAdornmentProps: {},
  adornmentPosition: 'end',
  pipe: undefined
};
process.env.NODE_ENV !== "production" ? RangeDateTextField.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.number, _propTypes.default.instanceOf(Date)]),
  minDate: _propTypes2.default.date,
  maxDate: _propTypes2.default.date,
  disablePast: _propTypes.default.bool,
  disableFuture: _propTypes.default.bool,
  format: _propTypes.default.string,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func.isRequired,
  onClear: _propTypes.default.func,
  onClick: _propTypes.default.func.isRequired,
  clearable: _propTypes.default.bool,
  utils: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.bool,
  InputProps: _propTypes.default.shape(),

  /** Input mask, used in keyboard mode read more <a href="https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme">here</a> */
  mask: _propTypes.default.any,

  /** Error message, shown if date is less then minimal date */
  minDateMessage: _propTypes.default.node,

  /** Error message, shown if date is more then maximal date */
  maxDateMessage: _propTypes.default.node,

  /** Message displaying in text field, if date is invalid (doesn't work in keyboard mode) */
  invalidLabel: _propTypes.default.string,

  /** Message displaying in text field, if null passed (doesn't work in keyboard mode) */
  emptyLabel: _propTypes.default.string,

  /** Dynamic label generation function [(date: Date, invalidLabel: string) => string] */
  labelFunc: _propTypes.default.func,

  /** On/off manual keyboard input mode */
  keyboard: _propTypes.default.bool,

  /** Icon displayed for open picker button in keyboard mode */
  keyboardIcon: _propTypes.default.node,

  /** enables/disable automatic opening of the picker when the user clicks enter */
  disableOpenOnEnter: _propTypes.default.bool,

  /** Message, appearing when date cannot be parsed */
  invalidDateMessage: _propTypes.default.node,

  /** Component that should replace the default Material-UI TextField */
  TextFieldComponent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /** Props to pass to keyboard input adornment */
  InputAdornmentProps: _propTypes.default.object,

  /** Specifies position of keyboard button adornment */
  adornmentPosition: _propTypes.default.oneOf(['start', 'end']),

  /** Callback firing when date that applied in the keyboard is invalid
   *  [(error: string) => void]
  */
  onError: _propTypes.default.func,

  /** Callback firing on change input in keyboard mode [(e: Event) => void] */
  onInputChange: _propTypes.default.func,
  pipe: _propTypes.default.func
} : void 0;

var _default = (0, _WithUtils.default)()(RangeDateTextField);

exports.default = _default;