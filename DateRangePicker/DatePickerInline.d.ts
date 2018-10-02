import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './components/Calendar';
import { MaterialUiPickersDate } from '../typings/date'
import { RangeBasePickerProps } from '../_shared/RangeBasePicker'
import { Omit } from '@material-ui/core'
import { BaseDatePickerProps } from './DatePicker';
import { RangeInlineWrapperProps } from '../wrappers/RangeInlineWrapper';

export interface DatePickerInlineProps extends
  RangeBasePickerProps,
  BaseDatePickerProps,
  Omit<RangeInlineWrapperProps, 'onChange' | 'value'> {
    onlyCalendar?: boolean
  }

declare const DatePickerInline: ComponentClass<DatePickerInlineProps>;

export default DatePickerInline;
