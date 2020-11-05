import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../client.service';
import { ClientDto } from '../interfaces/client.interface';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    id: string;
    isLoading: boolean = false;
    data: ClientDto = null;
    projectId: number;
    error: any;

    constructor(
        private location: Location,
        private service: ClientService,
        private toastr: ToastrService,
        private translate: TranslateService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.projectId = parseInt(this.route.snapshot.paramMap.get("projectId"));
    }

    async onSubmit(data: ClientDto) {
        try {
            data.projectId = this.projectId;
            
            this.isLoading = true;
            this.data = await this.service.create(data)
            this.location.back()
            this.toastr.success(this.translate.instant("SAVED"));
            this.isLoading = false;
        } catch (error) {
            this.toastr.error(this.translate.instant("SAVED_FAILED"));
            this.error = error;
            this.isLoading = false;
        }
    }
}
