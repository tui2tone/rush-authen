import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { DateValidators } from 'src/app/directives/date-validator.directive';
import { DateAdapter } from '@angular/material/core';
import { AppDateAdapter } from './date-format';

@Component({
    selector: 'app-datetimepicker',
    templateUrl: './datetimepicker.component.html',
    styleUrls: ['./datetimepicker.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatetimepickerComponent), multi: true },
        { provide: DateAdapter, useClass: AppDateAdapter },
    ]
})
export class DatetimepickerComponent implements ControlValueAccessor, OnInit, OnDestroy {

    picker3: any;
    @Input() placeholder: string;
    @Input() label: string;
    @Input() error: string;
    @Input() type: string = 'both';
    @Input() noMargin: boolean = false;
    @Output() valueChange = new EventEmitter();
    formControl: FormControl = new FormControl('');
    validators: any = {}

    _minDate: any;
    _maxDate: any;
    formError: any;
    subscribe: Subscription;
    isDisabled: boolean = false;
    onChange = (value: any) => { };
    onTouched = (value: any) => { };

    constructor() { }

    ngOnInit() {
        this.subscribe = this.formControl.valueChanges.subscribe(val => {
            this.formError = null;
            this.onChange(this.formControl.value)
        });
    }


    ngOnDestroy() {
        this.subscribe.unsubscribe()
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

    @Input()
    set disabled(isDisabled: boolean) {
        this.isDisabled = isDisabled;
        if (this.formControl && isDisabled) {
            this.formControl.disable()
        } else {
            this.formControl.enable()
        }
    }

    onClear() {
        this.formControl.setValue(null);
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

}
