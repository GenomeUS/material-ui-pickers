"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React = _interopRequireWildcard(require("react"));

var _WithUtils = _interopRequireDefault(require("./WithUtils"));

/* eslint-disable react/prop-types */
var getInitialDate = function getInitialDate(_ref, dateToParse) {
  var utils = _ref.utils,
      initialFocusedDate = _ref.initialFocusedDate;
  var initialDate = dateToParse || initialFocusedDate || utils.date();
  var date = utils.date(initialDate);
  return utils.isValid(date) ? date : utils.date();
};

var RangeBasePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RangeBasePicker, _React$Component);

  function RangeBasePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      date: getInitialDate(_this.props, new Date()),
      dateToChange: 'startDate',
      startDate: null,
      endDate: null,
      isAccepted: false
    };

    _this.getNextDateToChange = function (dateToChange) {
      if (dateToChange === 'startDate') {
        return 'endDate';
      }

      return 'startDate';
    };

    _this.changeDate = function (date, callback) {
      var _this$state = _this.state,
          dateToChange = _this$state.dateToChange,
          startDate = _this$state.startDate;

      if (!date) {
        return -1;
      }

      if (startDate && date.isBefore(startDate) && dateToChange === 'endDate') {
        _this.setState({
          startDate: date,
          endDate: null,
          date: date
        }, callback);

        return 0;
      }

      if (dateToChange === 'startDate') {
        _this.setState({
          startDate: date,
          endDate: null,
          date: date,
          dateToChange: 'endDate'
        }, callback);
      } else {
        _this.setState({
          endDate: date,
          date: date,
          dateToChange: 'startDate'
        }, callback);
      }

      return 0;
    };

    _this.resetDates = function () {
      var _this$props = _this.props,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate;

      _this.setState({
        startDate: startDate ? getInitialDate(_this.props, startDate) : null,
        endDate: endDate ? getInitialDate(_this.props, endDate) : null
      });
    };

    _this.changeStartDate = function (startDate, callback) {
      return _this.setState({
        startDate: startDate
      }, callback);
    };

    _this.changeEndDate = function (endDate, callback) {
      return _this.setState({
        endDate: endDate
      }, callback);
    };

    _this.handleAcceptedChange = function (isAccepted, callback) {
      return _this.setState({
        isAccepted: isAccepted
      }, callback);
    };

    _this.handleClear = function () {
      _this.resetDates();
    };

    _this.handleAccept = function () {
      return _this.props.onChange(_this.state.startDate, _this.state.endDate);
    };

    _this.handleTextFieldChange = function (date) {
      var onChange = _this.props.onChange;

      if (date === null) {
        onChange(null);
      } else {
        _this.changeDate(date);
      }
    };

    _this.pick12hOr24hFormat = function (default12hFormat, default24hFormat) {
      var _this$props2 = _this.props,
          format = _this$props2.format,
          labelFunc = _this$props2.labelFunc,
          ampm = _this$props2.ampm;

      if (format || labelFunc) {
        return format;
      }

      return ampm ? default12hFormat : default24hFormat;
    };

    _this.handleChange = function (newDate) {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
          handleAcceptedChange = _assertThisInitialize.handleAcceptedChange,
          changeDate = _assertThisInitialize.changeDate;

      var _this$props3 = _this.props,
          autoOk = _this$props3.autoOk,
          onChange = _this$props3.onChange;
      changeDate(newDate, function () {
        if (autoOk) {
          onChange(newDate); // pass down accept true, and make it false in the next tick

          handleAcceptedChange(true, function () {
            return handleAcceptedChange(false);
          });
        }
      });
    };

    return _this;
  }

  var _proto = RangeBasePicker.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props4 = this.props,
        utils = _this$props4.utils,
        startDate = _this$props4.startDate,
        endDate = _this$props4.endDate;

    if (prevProps.startDate !== startDate || prevProps.utils.locale !== utils.locale) {
      this.changeStartDate(getInitialDate(this.props, startDate));
    }

    if (prevProps.endDate !== endDate || prevProps.utils.locale !== utils.locale) {
      this.changeEndDate(getInitialDate(this.props, endDate));
    }
  };

  _proto.render = function render() {
    return this.props.children((0, _extends2.default)({}, this.props, this.state, {
      changeDate: this.changeDate,
      handleAcceptedChange: this.handleAcceptedChange,
      handleClear: this.handleClear,
      handleAccept: this.handleAccept,
      handleSetTodayDate: function handleSetTodayDate() {},
      handleTextFieldChange: this.handleTextFieldChange,
      pick12hOr24hFormat: this.pick12hOr24hFormat,
      handleChange: this.handleChange
    }));
  };

  return RangeBasePicker;
}(React.Component);

var _default = (0, _WithUtils.default)()(RangeBasePicker);

exports.default = _default;