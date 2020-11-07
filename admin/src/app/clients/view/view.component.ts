import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormMode } from 'src/app/enum/form.enum';
import { BreadcrumbItemDto } from 'src/app/interfaces/breadcrumb-item.interface';
import { ClientService } from '../client.service';
import { ClientDto } from '../interfaces/client.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

    id: number;
    data: ClientDto = null;
    isFetchLoading: boolean = false;
    isLoading: boolean = false;
    mode: number = FormMode.View;
    error: ClientDto = null;

    breadcrumb: BreadcrumbItemDto[] = [{
        name: "Project",
        link: "/projects"
    }, {
        name: "Clients",
        link: "/stats"
    }]

    constructor(
        private route: ActivatedRoute,
        private service: ClientService,
        private toastr: ToastrService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get("id"));

        this.fetch()
    }

    async fetch() {
        try {
            this.isFetchLoading = true;
            this.data = await this.service.find(this.id)
            this.isFetchLoading = false;
        } catch (error) {
            this.isFetchLoading = false;
            this.toastr.error(this.translate.instant("NOT_FOUND"));
        }
    }

    async onSubmit(data: ClientDto) {
        try {
            this.isLoading = true;
            this.data = await this.service.update(this.id, data)
            this.toastr.success(this.translate.instant("SAVED"));
            this.isLoading = false;
        } catch (error) {
            this.error = error
            this.isLoading = false;
            this.toastr.error(this.translate.instant("SAVED_FAILED"));
        }
    }

    onToggleMode() {
        this.mode
    }

    get disabled() {
        return this.mode == FormMode.View
    }
}
