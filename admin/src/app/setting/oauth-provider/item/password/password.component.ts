import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Config from 'src/app/constants';
import { OAuthProviderDto } from '../../interfaces/oauth-provider.interface';

@Component({
    selector: 'app-item-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

    @Output() onUpdated: EventEmitter<any> = new EventEmitter();
    @Input() providerId: number;
    data: OAuthProviderDto = null;
    form: FormGroup;
    disabled: boolean = false;
    isLoading: boolean = false;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getData()

        this.form = this.fb.group({
            isEnabled: false,
            isPasswordlessEnabled: false
        });
    }

    async getData() {
        const result: any = await this.http.get(`${Config.API_URL.OAUTH_PROVIDER}/${this.providerId}`).toPromise()
        this.data = result as OAuthProviderDto
        this.form.patchValue({
            ...result
        })
        this.form.markAsPristine()
        return result
    }

    async onFormSubmit() {
        try {
            const data = this.form.value
            await this.http.put(`${Config.API_URL.OAUTH_PROVIDER}/${this.providerId}`, data).toPromise();
            const result = await this.getData()
            this.onUpdated.emit(result)
            this.toastr.success('Updated');
        } catch (error) {
            this.toastr.error('Something goes wrong', error);
        }
    }

    onReset() {
        this.form.patchValue({
            ...this.data
        })
        this.form.markAsPristine()
    }

}
