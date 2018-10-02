import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import RangeDateTextField from '../_shared/RangeDateTextField';
import DomainPropTypes from '../constants/prop-types';

export class RangeInlineWrapper extends PureComponent {
  static propTypes = {
    /** Show only calendar for datepicker in popover mode */
    onlyCalendar: PropTypes.bool,
    /** Picker value */
    value: DomainPropTypes.date,
    /** On open callback [(e: Event) => void] */
    onOpen: PropTypes.func,
    /** On close callback [(e: Event) => void] */
    onClose: PropTypes.func,
    /** Format string */
    format: PropTypes.string,
    /** Dialog props passed to material-ui Dialog */
    PopoverProps: PropTypes.object,
    labelFunc: PropTypes.func,
    onClear: PropTypes.func,
    isAccepted: PropTypes.bool,
    children: PropTypes.node.isRequired,
    keyboard: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    startDate: DomainPropTypes.date,
    endDate: DomainPropTypes.date,
  }

  static defaultProps = {
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
    endDate: undefined,
  }

  state = {
    anchorEl: null,
  }

  static getDerivedStateFromProps(nextProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      return {
        anchorEl: null,
      };
    }

    return null;
  }

  open = (e) => {
    this.setState({ anchorEl: e.currentTarget });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  close = () => {
    this.setState({ anchorEl: null });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const {
      value,
      format,
      children,
      onOpen,
      onClose,
      PopoverProps,
      isAccepted,
      keyboard,
      onlyCalendar,
      classes,
      startDate,
      endDate,
      onAccept,
      ...other
    } = this.props;

    return (
      <Fragment>
        <RangeDateTextField
          startDate={startDate}
          endDate={endDate}
          format={format}
          onClick={this.open}
          keyboard={keyboard}
          {...other}
        />

        <Popover
          id="picker-popover"
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.close}
          classes={{
            paper: classes.popoverPaper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: keyboard ? 'right' : 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: keyboard ? 'right' : 'center',
          }}
          children={React.cloneElement(this.props.children, {
            onClose: this.close,
            onAccept: () => { onAccept(); this.close(); },
          })}
          {...PopoverProps}
        />
      </Fragment>
    );
  }
}

const styles = {
  popoverPaper: {
    maxWidth: 310,
    minWidth: 290,
    paddingBottom: 8,
  },
};

export default withStyles(styles)(RangeInlineWrapper);
