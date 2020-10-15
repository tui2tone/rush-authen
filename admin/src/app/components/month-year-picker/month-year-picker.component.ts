import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import moment, { Moment } from 'moment';
import { AppMonthAdapter, APP_MONTH_FORMATS } from './month-format';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateValidators } from 'src/app/directives/date-validator.directive';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
    selector: 'app-month-year-picker',
    templateUrl: './month-year-picker.component.html',
    styleUrls: ['./month-year-picker.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MonthYearPickerComponent), multi: true },
        { provide: DateAdapter, useClass: AppMonthAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_MONTH_FORMATS }
    ]
})
export class MonthYearPickerComponent implements ControlValueAccessor, OnInit, OnDestroy {

    picker3: any;
    @Input() placeholder: string;
    @Input() label: string;
    @Input() error: string;
    @Input() type: string = 'both';
    @Input() noMargin: boolean = false;
    @Output() valueChange = new EventEmitter();
    formControl: FormControl = new FormControl('');

    _minDate: any;
    _maxDate: any;
    formError: any;
    subscriber: Subscription;
    isDisabled: boolean = false;
    onChange = (value: any) => { };
    onTouched = (value: any) => { };
    validators: any = {}

    constructor() { }

    ngOnInit() {
        this.subscriber = this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
            this.formError = null;
            this.onChange(this.formControl.value)
        });
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe()
    }

    writeValue(value: any): void {
        if (this.formControl && value) {
            if (moment.isMoment(value)) {
                const date = moment(value)
                this.formControl.setValue(date.toDate());
                this.onChange(date.toDate());
            } else {
                const date = moment(value, "YYYY-MM-DD")
                this.formControl.setValue(date.toDate());
                this.onChange(date.toDate());
            }
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onClear() {
        this.formControl.setValue(null);
    }

    @Input()
    set disabled(isDisabled: boolean) {
        this.isDisabled = isDisabled;
        if (this.formControl && isDisabled) {
            this.formControl.disable()
        } else {
            this.formControl.enable()
        }
    }

    get isInvalid() {
        return !this.isDisabled && !this.formControl.valid && this.formControl.touched
    }

    @Input()
    set touched(isTouched: boolean) {
        if (isTouched) {
            this.formControl.markAsTouched({ onlySelf: true })
        }
    }

    @Input()
    set required(isRequired: boolean) {
        if (this.formControl && isRequired) {
            this.validators['required'] = Validators.required
        }
        this.formControl.clearValidators()
        this.formControl.setValidators(Object.values(this.validators));
        this.formControl.updateValueAndValidity()
    }

    @Input()
    set minDate(minDate: any) {
        this._minDate = minDate;
        if (this.formControl && minDate) {
            this.validators['minDate'] = DateValidators.minDateFieldValidator(minDate)
        }

        this.formControl.clearValidators()
        this.formControl.setValidators(Object.values(this.validators));
        this.formControl.updateValueAndValidity()
    }

    @Input()
    set maxDate(maxDate: any) {
        this._maxDate = maxDate;
        if (this.formControl && maxDate) {
            this.validators['maxDate'] = DateValidators.maxDateFieldValidator(maxDate)
        }
        this.formControl.clearValidators()
        this.formControl.setValidators(Object.values(this.validators));
        this.formControl.updateValueAndValidity()
    }


    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const date = moment(normalizedMonth)
        this.formControl.setValue(date.toDate());
        datepicker.close();
    }
}

