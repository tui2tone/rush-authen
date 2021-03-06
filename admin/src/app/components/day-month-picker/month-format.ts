import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import moment from 'moment';
import { Injectable } from "@angular/core";

@Injectable()
export class AppMonthAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            let day: string = date.getDate().toString();
            day = + day < 10 ? '0' + day : day;
            let month: string = (date.getMonth() + 1).toString();
            month = + month < 10 ? '0' + month : month;
            return `${day}/${month}`;
        }
        return date.toDateString();
    }

    parse(value: any): Date | null {
        const date = moment(value, 'DD/MM');
        return date.isValid() ? date.toDate() : null;
    }
}
export const APP_MONTH_FORMATS: MatDateFormats = {
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