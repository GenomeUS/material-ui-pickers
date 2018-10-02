"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.RangeInlineWrapper = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Popover = _interopRequireDefault(require("@material-ui/core/Popover"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _RangeDateTextField = _interopRequireDefault(require("../_shared/RangeDateTextField"));

var _propTypes2 = _interopRequireDefault(require("../constants/prop-types"));

var RangeInlineWrapper =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(RangeInlineWrapper, _PureComponent);

  function RangeInlineWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      anchorEl: null
    };

    _this.open = function (e) {
      _this.setState({
        anchorEl: e.currentTarget
      });

      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    };

    _this.close = function () {
      _this.setState({
        anchorEl: null
      });

      if (_this.props.onClose) {
        _this.props.onClose();
      }
    };

    return _this;
  }

  RangeInlineWrapper.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      return {
        anchorEl: null
      };
    }

    return null;
  };

  var _proto = RangeInlineWrapper.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        value = _this$props.value,
        format = _this$props.format,
        children = _this$props.children,
        onOpen = _this$props.onOpen,
        onClose = _this$props.onClose,
        PopoverProps = _this$props.PopoverProps,
        isAccepted = _this$props.isAccepted,
        keyboard = _this$props.keyboard,
        onlyCalendar = _this$props.onlyCalendar,
        classes = _this$props.classes,
        startDate = _this$props.startDate,
        endDate = _this$props.endDate,
        _onAccept = _this$props.onAccept,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["value", "format", "children", "onOpen", "onClose", "PopoverProps", "isAccepted", "keyboard", "onlyCalendar", "classes", "startDate", "endDate", "onAccept"]);
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_RangeDateTextField.default, (0, _extends2.default)({
      startDate: startDate,
      endDate: endDate,
      format: format,
      onClick: this.open,
      keyboard: keyboard
    }, other)), _react.default.createElement(_Popover.default, (0, _extends2.default)({
      id: "picker-popover",
      open: Boolean(this.state.anchorEl),
      anchorEl: this.state.anchorEl,
      onClose: this.close,
      classes: {
        paper: classes.popoverPaper
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: keyboard ? 'right' : 'center'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: keyboard ? 'right' : 'center'
      },
      children: _react.default.cloneElement(this.props.children, {
        onClose: this.close,
        onAccept: function onAccept() {
          _onAccept();

          _this2.close();
        }
      })
    }, PopoverProps)));
  };

  return RangeInlineWrapper;
}(_react.PureComponent);

exports.RangeInlineWrapper = RangeInlineWrapper;
RangeInlineWrapper.defaultProps = {
  value: new Date(),
  labelFunc: undefined,
  onlyCalendar: false,
  format: undefined,
  onClear: undefined,
  onOpen: undefined,
  onClose: undefined,
  PopoverProps: undefined,
  isAccepted: false,
  keyboard: undefined,
  startDate: undefined,
  endDate: undefined
};
process.env.NODE_ENV !== "production" ? RangeInlineWrapper.propTypes = {
  /** Show only calendar for datepicker in popover mode */
  onlyCalendar: _propTypes.default.bool,

  /** Picker value */
  value: _propTypes2.default.date,

  /** On open callback [(e: Event) => void] */
  onOpen: _propTypes.default.func,

  /** On close callback [(e: Event) => void] */
  onClose: _propTypes.default.func,

  /** Format string */
  format: _propTypes.default.string,

  /** Dialog props passed to material-ui Dialog */
  PopoverProps: _propTypes.default.object,
  labelFunc: _propTypes.default.func,
  onClear: _propTypes.default.func,
  isAccepted: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  keyboard: _propTypes.default.bool,
  classes: _propTypes.default.object.isRequired,
  startDate: _propTypes2.default.date,
  endDate: _propTypes2.default.date
} : void 0;
var styles = {
  popoverPaper: {
    maxWidth: 310,
    minWidth: 290,
    paddingBottom: 8
  }
};

var _default = (0, _withStyles.default)(styles)(RangeInlineWrapper);

exports.default = _default;