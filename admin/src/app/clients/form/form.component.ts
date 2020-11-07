import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';
import { ClientDto } from '../interfaces/client.interface';
import { FormMode } from 'src/app/enum/form.enum';

@Component({
    selector: 'app-client-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Input() error: ClientDto;
    @Input() mode: number = FormMode.View;
    @Input() disabled: boolean = false;
    @Input() isLoading: boolean = false;

    @Input()
    set value(value: ClientDto) {
        if (this.form) {
            this.form.patchValue(_.omit(value));
        }
    }
    
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: '',
            description: '',
            clientId: '',
            clientSecret: '',
            isActive: false
        });
    }

    onFormSubmit() {
        if (!this.form.valid) {
            this.toastr.error("Form Invalid");
            this.form.markAsTouched()
            return false;
        }

        const data = this.form.value
        this.onSubmit.emit(data);
    }

    get isCreateMode() {
        return this.mode == FormMode.Create
    }

}