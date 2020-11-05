import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ClientDto } from '../interfaces/client.interface';

@Component({
    selector: 'app-client-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Input() error: ClientDto;
    @Input() mode: string = 'view';
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
        private toastr: ToastrService,
        private translate: TranslateService
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
            this.toastr.error(this.translate.instant("FORM_INVALID"));
            this.form.markAsTouched()
            return false;
        }

        const data = this.form.value
        this.onSubmit.emit(data);
    }


}