import { ComponentClass, ReactNode } from 'react';
import { DateTextFieldProps } from '../_shared/DateTextField';
import { PopoverProps } from '@material-ui/core/Popover';

export interface RangeInlineWrapperProps extends Partial<DateTextFieldProps> {
  onOpen?: () => void;
  onClose?: () => void;
  PopoverProps?: Partial<PopoverProps>;
}

declare const RangeInlineWrapper: ComponentClass<RangeInlineWrapperProps>;

export default RangeInlineWrapper;
