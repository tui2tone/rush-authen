import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }
    ],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter();
    @Input() label: string;
    @Input() placeholder: string;
    @Input() type: string = 'text';
    @Input() name: string;
    @Input() error: string = null;
    onChange = (value: string) => { };
    onTouched = (value: string) => { };

    form: FormControl = new FormControl('');
    subscriber: Subscription;

    constructor() { }

    get value(): any {
        return this.form.value;
    }

    set value(val) {
        this.form.setValue(val);
    }

    @Input()
    set disabled(isDisabled: boolean) {
        if (this.form && isDisabled) {
            this.form.disable()
        } else {
            this.form.enable()
        }
    }

    ngOnInit() {
        this.subscriber = this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
            this.clearError();
            this.onChange(this.form.value);

        });
    }

    onClick(value) {
        if (this.valueChange) {
            setTimeout(() => {
                this.valueChange.emit(this.form.value)
            }, 50)
        }
    }

    ngOnDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }

    clearError() {
        this.error = null;
    }

    writeValue(value: string): void {
        this.form.setValue(value);
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

}
