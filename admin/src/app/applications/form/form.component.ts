import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { ApplicationDto } from '../interfaces/application.interface';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    @Output() onSubmit: EventEmitter<ApplicationDto> = new EventEmitter();
    @Input() error: any;
    @Input() mode: string = 'view';
    @Input() disabled: boolean = false;
    @Input() isLoading: boolean = false;

    @Input()
    set data(value: ApplicationDto) {
        if (this.form) {
            this.form.patchValue(value);
        }
    }

    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: ''
        });
    }

    onFormSubmit() {
        if (!this.form.valid) {
            this.toastr.error(this.translate.instant("FORM_INVALID"));
            this.form.markAsTouched()
            return false;
        }

        const data = this.form.value as ApplicationDto
        this.onSubmit.emit(data);
    }

}