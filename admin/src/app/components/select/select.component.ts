import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as queryString from 'query-string'

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }
    ]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() label: String;
    @Input() placeholder: String;
    @Input() url: string;
    @Input() multiple: boolean = false;
    @Input() options: any = null;
    @Input() valueId: string = 'id';
    @Input() valueLabel: string = 'name';
    @Input() query: any = {};
    @Input() customClass: string = 'form-group';
    @Input() noEmpty: boolean = false;
    @Input() clearable: boolean = true;
    @Input() noMargin: boolean = false;
    @Input() httpMethod: string = 'GET';
    @Input() disabledItemIds: number[] = [];
    @Input() error: string = null;
    @Input() submitPayload: any = {};
    @Output() valueChange = new EventEmitter();
    @Output() addTagCallback = new EventEmitter();
    form: FormControl = new FormControl('');
    items: any = [];
    preSelectedItems: any = [];
    displayValue: string = ""
    valueChanges: Subscription;
    isDisabled: boolean = true;
    isFocused: boolean = false;
    isTouched: boolean = false;
    keyword: string = '';

    onChange = (value: any) => { };
    onTouched = (value: any) => { };

    constructor(
        private http$: HttpClient,
        private translate: TranslateService
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
        return this.form.value;
    }

    set value(val) {
        this.form.setValue(val || null);
    }

    @Input()
    set formSelected(value: any) {
        if (value) {
            value[this.valueLabel] = this.translate.instant(value[this.valueLabel])
            this.items = [value]
            this.preSelectedItems = [value]
        }
    }

    ngOnInit() {
        this.form.disable()
        this.valueChanges = this.form.valueChanges.subscribe(val => {
            this.clearError();

            if (this.valueChange) {
                const finded = this.items.find((item: any) => item.id === this.form.value)
                this.valueChange.emit(finded);
            }
        });

        this.getItems();
    }

    clearError() {
        this.error = null;
    }

    ngOnDestroy() {
        this.valueChanges.unsubscribe();
    }

    onValueChange(value: any) {
        this.onChange(this.form.value);
    }

    onFocus() {
        this.isFocused = true;
        this.getItems();
    }

    onSearch(term: any) {
        this.keyword = term.term;
        this.getItems()
    }

    async getItems() {
        if (this.url && !this.isDisabled && this.isFocused) {
            if (this.httpMethod == 'POST') {
                const params = _.pick({
                    ...this.query,
                    keywords: this.keyword
                }, _.identity)
                const response: any = await this.http$.post(this.url, { params }).toPromise()
                
                this.items = response.map((item: any) => {
                    item[this.valueLabel] = this.translate.instant(item[this.valueLabel])
                    return item
                });
            } else {
                const params = _.pick({
                    ...this.query,
                    keywords: this.keyword
                }, _.identity)
                const response: any = await this.http$.get(this.url, { params }).toPromise()
                this.items = response.map((item: any) => {
                    item[this.valueLabel] = this.translate.instant(item[this.valueLabel])
                    return item
                });
            }
        } else {
            this.items = this.options || this.preSelectedItems
        }
    }

    writeValue(value: any): void {
        if (this.form) {
            setTimeout(() => {
                this.form.setValue(value || null);

                // Fetch Data If Form Selected Not Provided
                if (value && !this.items.length) {
                    this.http$.get(`${this.url}?${queryString.stringify({
                        [this.valueId]: value
                    })}`).subscribe((items) => {
                        this.items = items
                        this.preSelectedItems = items
                    })
                }
            }, 150)
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    get isInvalid() {
        return !this.isDisabled && !this.form.valid && this.form.touched
    }

    @Input()
    set touched(isTouched: boolean) {
        if (isTouched) {
            this.form.markAsTouched({ onlySelf: true })
        }
    }
}
