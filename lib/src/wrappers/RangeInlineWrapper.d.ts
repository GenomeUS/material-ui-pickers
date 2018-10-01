import { ComponentClass, ReactNode } from 'react';
import { RangeDateTextFieldProps } from '../_shared/RangeDateTextField';
import { PopoverProps } from '@material-ui/core/Popover';

export interface RangeInlineWrapperProps extends Partial<RangeDateTextFieldProps> {
  onOpen?: () => void;
  onClose?: () => void;
  PopoverProps?: Partial<PopoverProps>;
}

declare const RangeInlineWrapper: ComponentClass<RangeInlineWrapperProps>;

export default RangeInlineWrapper;
