import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MultiSelectComponent), multi: true }
    ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
    @Input() label: String;
    @Input() placeholder: String;
    @Input() url: string;
    @Input() multiple: boolean = false;
    @Input() options: any = null;
    @Input() valueId: String = 'id';
    @Input() valueLabel: string = 'name';
    @Input() query: any = {};
    @Input() customClass: string = 'form-group';
    @Input() noEmpty: boolean = false;
    @Input() clearable: boolean = true;
    @Input() noMargin: boolean = false;
    @Input() httpMethod: string = 'GET';
    @Input() submitPayload: any = {};
    @Output() valueChange = new EventEmitter();
    @Output() addTagCallback = new EventEmitter();
    form: FormControl = new FormControl('');
    formControl: any[] = [];
    formError: any;
    items: any = [];
    preSelectedItems: any = [];
    displayValue: string = ""
    onChange = (value: any) => { };
    onTouched = (value: any) => { };
    valueChanges: Subscription;
    isDisabled: boolean = false;
    isRequired: boolean = false;
    isFocused: boolean = false;
    isTouched: boolean = false;

    constructor(
        private http$: HttpClient
    ) {
    }

    @Input()
    set disabled(isDisabled: boolean) {
        this.isDisabled = isDisabled;
        if (this.form) {
            setTimeout(() => {
                if (isDisabled) {
                    this.form.disable()
                } else {
                    this.form.enable()
                }
            })
        }
    }

    @Input()
    set required(isRequired: boolean) {
        if (this.form && isRequired) {
            this.form.setValidators([Validators.required]);
        } else {
            this.form.clearValidators()
        }
        this.form.updateValueAndValidity()
    }

    get value(): any {
        return this.formControl;
    }

    set value(val) {
        this.formControl = val;
    }

    @Input()
    set formSelected(value: any) {
        if (value) {
            this.formControl = value;
            this.items = value
            this.preSelectedItems = value
        }
    }

    @Input()
    set error(value: any) {
        this.formError = value;
    }

    ngOnInit() {
        this.getItems();
    }

    onValueChange(value) {
        this.onChange(this.formControl);
    }

    onFocus() {
        this.isFocused = true;
        this.getItems();
    }

    getItems() {
        if (this.url && !this.isDisabled && this.isFocused) {
            if (this.httpMethod == 'POST') {
                this.http$.post(this.url, this.query)
                    .subscribe((response) => {
                        this.items = response;
                    });
            } else {
                const query = _.pick(this.query, _.identity)
                this.http$.get(this.url, {
                    params: query
                })
                    .subscribe((response) => {
                        this.items = response;
                    });
            }
        } else {
            this.items = this.options || this.preSelectedItems
        }
    }

    writeValue(value: any): void { }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    get isInvalid() {
        if (!this.isDisabled && this.isRequired && this.isTouched) {
            return this.formControl.length <= 0
        }
        return !this.isDisabled && this.isTouched
    }

    @Input()
    set touched(isTouched: boolean) {
        if (isTouched) {
            this.form.markAsTouched({ onlySelf: true })
        }
    }

}
