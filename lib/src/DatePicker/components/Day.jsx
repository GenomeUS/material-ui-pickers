import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

class Day extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    current: PropTypes.bool,
    inRange: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    selected: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    hidden: false,
    current: false,
    inRange: false,
    selected: false,
  }

  render() {
    const {
      children, classes, disabled, hidden, current, inRange, selected, ...other
    } = this.props;

    const className = classnames(classes.day, {
      [classes.hidden]: hidden,
      [classes.current]: current,
      [classes.selected]: selected,
      [classes.disabled]: disabled,
      [classes.inRange]: inRange && !selected,
    });

    return (
      <IconButton
        className={className}
        tabIndex={hidden || disabled ? -1 : 0}
        {...other}
      >
        {children}
      </IconButton>
    );
  }
}

const styles = theme => ({
  day: {
    width: 40,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    padding: '0 2px',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  current: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  selected: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    padding: '0px',
    width: '36px',
    margin: '0 2px',
    transform: 'scale(1.2, 1.2)',
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
  inRange: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    marginTop: '8px',
    marginBottom: '8px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0%',
  },
});

export default withStyles(styles, { name: 'MuiPickersDay' })(Day);
