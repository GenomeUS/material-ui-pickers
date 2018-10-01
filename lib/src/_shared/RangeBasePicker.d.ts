import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date'
import { ComponentClass, ReactNode } from 'react';

export interface RangeBasePickerProps {
  value: DateType;
  utils?: any;
  onChange: (date: MaterialUiPickersDate) => void;
  autoOk?: boolean;
  ampm?: boolean;
  format?: string;
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  disableOpenOnEnter?: boolean;
}

export interface InnerRangeBasePickerProps {
  date: MaterialUiPickersDate;
  handleClear: () => void;
  handleAccept: () => void;
  handleSetTodayDate: () => void;
  handleChange: (date: MaterialUiPickersDate, isFinish?: Boolean) => void
  handleTextFieldChange: (date: MaterialUiPickersDate | null) => void;
  pick12hOr24hFormat: (default12hFormat: string, default24hFormat: string) => string;
}

export interface OuterRangeBasePickerProps extends RangeBasePickerProps {
  children: (options: InnerRangeBasePickerProps) => ReactNode;
}

declare const RangeBasePickerRenderProp: ComponentClass<OuterRangeBasePickerProps>
export default RangeBasePickerRenderProp
