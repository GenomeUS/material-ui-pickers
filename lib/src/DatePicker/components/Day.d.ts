import { ComponentClass, ReactNode } from 'react';

export interface DayProps {
    children: ReactNode;
    current?: boolean;
    inRange?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    selected?: boolean;
}

declare const Day: ComponentClass<DayProps>;

export default Day;

