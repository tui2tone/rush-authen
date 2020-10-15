import { NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { Injectable } from "@angular/core";

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
        const date = moment(value, 'DD/MM/YYYY');
        return date.isValid() ? date.toDate() : null;
    }
}