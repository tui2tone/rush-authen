import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import moment from 'moment';
const FORMAT_DATE = 'YYYY-MM-DD';
const DISPLAY_FORMAT_DATE = 'DD/MM/YYYY';

export class DateValidators {
    static minDateValidator(dateField: string, validateField: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            if (control.value == null) {
                return null;
            }

            const controlDate = moment(control.get(dateField).value, FORMAT_DATE);

            if (!controlDate.isValid()) {
                return null;
            }

            const validationDate = moment(control.get(validateField).value, FORMAT_DATE);
            
            return controlDate.isSameOrAfter(validationDate) ? null : {
                'dateMin': validationDate.format(DISPLAY_FORMAT_DATE)
            };
        };
    }

    static maxDateValidator(dateField: string, validateField: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            if (control.value == null) {
                return null;
            }

            const controlDate = moment(control.get(dateField).value, FORMAT_DATE);

            if (!controlDate.isValid()) {
                return null;
            }

            const validationDate = moment(control.get(validateField).value, FORMAT_DATE);

            return controlDate.isSameOrBefore(validationDate) ? null : {
                'dateMax': validationDate.format(DISPLAY_FORMAT_DATE)
            };
        };
    }

    static minDateFieldValidator(date: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            if (control.value == null) {
                return null;
            }

            const controlDate = moment(control.value, FORMAT_DATE);

            if (!controlDate.isValid()) {
                return null;
            }

            const validationDate = moment(date, FORMAT_DATE);

            return controlDate.isSameOrAfter(validationDate) ? null : {
                'dateMin': validationDate.format(DISPLAY_FORMAT_DATE)
            };
        };
    }

    static maxDateFieldValidator(date: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            if (control.value == null) {
                return null;
            }

            const controlDate = moment(control.value, FORMAT_DATE);

            if (!controlDate.isValid()) {
                return null;
            }

            const validationDate = moment(date, FORMAT_DATE);

            return controlDate.isSameOrBefore(validationDate) ? null : {
                'dateMax': validationDate.format(DISPLAY_FORMAT_DATE)
            };
        };
    }
}