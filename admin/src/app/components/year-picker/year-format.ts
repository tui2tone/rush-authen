import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import moment from 'moment';
import { Injectable } from "@angular/core";

@Injectable()
export class AppYearAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            let year: string = date.getFullYear().toString();
            return `${year}`;
        }
        return date.toDateString();
    }

    parse(value: any): Date | null {
        const date = moment(value, 'YYYY');
        return date.isValid() ? date.toDate() : null;
    }
}
export const APP_YEAR_FORMATS: MatDateFormats = {
    parse: {
        dateInput: {
            month: 'numeric', year: 'numeric', day: 'numeric'
        },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: {
            year: 'numeric', month: 'long', day: 'numeric'
        },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};