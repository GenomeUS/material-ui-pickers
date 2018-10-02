"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.DatePicker = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _Calendar = _interopRequireDefault(require("./components/Calendar"));

var _YearSelection = _interopRequireDefault(require("./components/YearSelection"));

var _PickerToolbar = _interopRequireDefault(require("../_shared/PickerToolbar"));

var _ToolbarButton = _interopRequireDefault(require("../_shared/ToolbarButton"));

var _propTypes2 = _interopRequireDefault(require("../constants/prop-types"));

var _WithUtils = _interopRequireDefault(require("../_shared/WithUtils"));

var DatePicker =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(DatePicker, _PureComponent);

  function DatePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      showYearSelection: _this.props.openToYearSelection
    };

    _this.handleYearSelect = function (date) {
      _this.props.onChange(date, false);

      _this.openCalendar();
    };

    _this.openYearSelection = function () {
      _this.setState({
        showYearSelection: true
      });
    };

    _this.openCalendar = function () {
      _this.setState({
        showYearSelection: false
      });
    };

    return _this;
  }

  var _proto = DatePicker.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        disablePast = _this$props.disablePast,
        disableFuture = _this$props.disableFuture,
        onChange = _this$props.onChange,
        animateYearScrolling = _this$props.animateYearScrolling,
        leftArrowIcon = _this$props.leftArrowIcon,
        rightArrowIcon = _this$props.rightArrowIcon,
        renderDay = _this$props.renderDay,
        utils = _this$props.utils,
        shouldDisableDate = _this$props.shouldDisableDate,
        allowKeyboardControl = _this$props.allowKeyboardControl,
        startDate = _this$props.startDate,
        endDate = _this$props.endDate,
        clearable = _this$props.clearable,
        onClose = _this$props.onClose,
        onAccept = _this$props.onAccept;
    var showYearSelection = this.state.showYearSelection;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_PickerToolbar.default, null, _react.default.createElement(_ToolbarButton.default, {
      variant: "subheading",
      onClick: this.openYearSelection,
      selected: showYearSelection,
      label: utils.getYearText(this.date)
    }), _react.default.createElement(_ToolbarButton.default, {
      variant: "display1",
      onClick: this.openCalendar,
      selected: !showYearSelection,
      label: utils.getDatePickerHeaderText(this.date)
    })), this.props.children, showYearSelection ? _react.default.createElement(_YearSelection.default, {
      date: this.date,
      onChange: this.handleYearSelect,
      minDate: this.minDate,
      maxDate: this.maxDate,
      disablePast: disablePast,
      disableFuture: disableFuture,
      animateYearScrolling: animateYearScrolling,
      utils: utils
    }) : _react.default.createElement(_Calendar.default, {
      date: this.date,
      onChange: onChange,
      disablePast: disablePast,
      disableFuture: disableFuture,
      minDate: this.minDate,
      maxDate: this.maxDate,
      leftArrowIcon: leftArrowIcon,
      rightArrowIcon: rightArrowIcon,
      renderDay: renderDay,
      utils: utils,
      shouldDisableDate: shouldDisableDate,
      allowKeyboardControl: allowKeyboardControl,
      startDate: startDate,
      endDate: endDate
    }), _react.default.createElement(_DialogActions.default, {
      style: {
        diplay: 'flex',
        alignItems: 'center'
      }
    }, clearable && _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: function onClick() {},
      "aria-label": "Clear"
    }, 'Clear'), _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: onClose,
      "aria-label": "Cancel",
      style: {
        margin: 0,
        color: 'black'
      }
    }, 'Cancel'), _react.default.createElement(_Button.default, {
      color: "primary",
      onClick: onAccept,
      "aria-label": "OK",
      style: {
        margin: 0
      }
    }, 'OK')));
  };

  (0, _createClass2.default)(DatePicker, [{
    key: "date",
    get: function get() {
      return this.props.utils.startOfDay(this.props.date);
    }
  }, {
    key: "minDate",
    get: function get() {
      return this.props.utils.date(this.props.minDate);
    }
  }, {
    key: "maxDate",
    get: function get() {
      return this.props.utils.date(this.props.maxDate);
    }
  }]);
  return DatePicker;
}(_react.PureComponent);

exports.DatePicker = DatePicker;
DatePicker.defaultProps = {
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
  onClose: function onClose() {},
  onAccept: function onAccept() {}
};
process.env.NODE_ENV !== "production" ? DatePicker.propTypes = {
  date: _propTypes.default.object.isRequired,
  minDate: _propTypes2.default.date,
  maxDate: _propTypes2.default.date,
  onChange: _propTypes.default.func.isRequired,
  disablePast: _propTypes.default.bool,
  disableFuture: _propTypes.default.bool,
  animateYearScrolling: _propTypes.default.bool,
  openToYearSelection: _propTypes.default.bool,
  children: _propTypes.default.node,
  leftArrowIcon: _propTypes.default.node,
  rightArrowIcon: _propTypes.default.node,
  renderDay: _propTypes.default.func,
  utils: _propTypes.default.object.isRequired,
  shouldDisableDate: _propTypes.default.func,
  allowKeyboardControl: _propTypes.default.bool,
  clearable: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  onAccept: _propTypes.default.func
} : void 0;

var _default = (0, _WithUtils.default)()(DatePicker);

exports.default = _default;