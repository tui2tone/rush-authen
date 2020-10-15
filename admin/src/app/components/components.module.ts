import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask'
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarLanguageComponent } from './navbar/navbar-language/navbar-language.component';
import { NavbarProfileComponent } from './navbar/navbar-profile/navbar-profile.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AppDatatableComponent } from './datatable/datatable.component';
import { ExpandAnimateComponent } from './expand-animate/expand-animate.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BtnPrimaryComponent } from './button/btn-primary/btn-primary.component';
import { BtnSecondaryComponent } from './button/btn-secondary/btn-secondary.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { ConfirmModalViewComponent } from './confirm-modal/confirm-modal-view/confirm-modal-view.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RowComponent } from './row/row.component';
import { ColumnComponent } from './row/column/column.component';
import { TableComponent } from './table/table.component';
import { SelectComponent } from './select/select.component';
import { TheadComponent } from './table/thead/thead.component';
import { TbodyComponent } from './table/tbody/tbody.component';
import { CardComponent } from './card/card.component';
import { SectionHeaderComponent } from './section/section-header/section-header.component';
import { CardFormComponent } from './card/card-form/card-form.component';
import { BtnSuccessComponent } from './button/btn-success/btn-success.component';
import { AppDirectivesModule } from '../directives/directives.module';
import { NavbarMenuItemComponent } from './navbar/navbar-menu-item/navbar-menu-item.component';
import { NavbarMenuComponent } from './navbar/navbar-menu/navbar-menu.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageBodyComponent } from './page-body/page-body.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ToggleComponent } from './toggle/toggle.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { TextareaComponent } from './textarea/textarea.component';
import { MatSelectModule } from '@angular/material/select';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { ImagePreviewComponent } from './imageupload/image-preview/image-preview.component';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { DayMonthPickerComponent } from './day-month-picker/day-month-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MyMatPaginatorIntl } from './datatable/paginator-intl';
import { MonthYearPickerComponent } from './month-year-picker/month-year-picker.component';
import { YearPickerComponent } from './year-picker/year-picker.component';

@NgModule({
    declarations: [
        InputComponent,
        SidebarContainerComponent,
        SidebarComponent,
        SidebarItemComponent,
        AlertComponent,
        LoaderComponent,
        NavbarComponent,
        DropdownComponent,
        NavbarLanguageComponent,
        NavbarProfileComponent,
        ConfirmModalComponent,
        AppDatatableComponent,
        ExpandAnimateComponent,
        BtnPrimaryComponent,
        BtnSecondaryComponent,
        FormInputComponent,
        ConfirmModalViewComponent,
        RowComponent,
        ColumnComponent,
        TableComponent,
        SelectComponent,
        TheadComponent,
        TbodyComponent,
        CardComponent,
        SectionHeaderComponent,
        CardFormComponent,
        BtnSuccessComponent,
        NavbarMenuItemComponent,
        NavbarMenuComponent,
        CheckboxComponent,
        DatetimepickerComponent,
        PageHeaderComponent,
        PageBodyComponent,
        SearchInputComponent,
        ToggleComponent,
        TextareaComponent,
        ImageuploadComponent,
        ImagePreviewComponent,
        DayMonthPickerComponent,
        MultiSelectComponent,
        MonthYearPickerComponent,
        YearPickerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule,
        TranslateModule,
        MatSidenavModule,
        MatMenuModule,
        NgxSmartModalModule,
        NgxDatatableModule,
        NgxPaginationModule,
        NgSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        ClickOutsideModule,
        MatDialogModule,
        NgxFileDropModule,
        AppDirectivesModule,
        MatExpansionModule,
        UiSwitchModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatIconModule,
        NgxMaskModule,
        NgbTypeaheadModule
    ],
    exports: [
        InputComponent,
        SidebarContainerComponent,
        SidebarComponent,
        SidebarItemComponent,
        AlertComponent,
        LoaderComponent,
        NavbarComponent,
        ConfirmModalComponent,
        AppDatatableComponent,
        ExpandAnimateComponent,
        BtnPrimaryComponent,
        BtnSecondaryComponent,
        FormInputComponent,
        ConfirmModalViewComponent,
        RowComponent,
        ColumnComponent,
        TableComponent,
        SelectComponent,
        TheadComponent,
        TbodyComponent,
        CardComponent,
        SectionHeaderComponent,
        CardFormComponent,
        BtnSuccessComponent,
        CheckboxComponent,
        DatetimepickerComponent,
        PageHeaderComponent,
        PageBodyComponent,
        SearchInputComponent,
        ToggleComponent,
        TextareaComponent,
        ImageuploadComponent,
        ImagePreviewComponent,
        DayMonthPickerComponent,
        MultiSelectComponent,
        MonthYearPickerComponent,
        YearPickerComponent
    ],
    providers: [
        {
            provide: MatPaginatorIntl, deps: [TranslateService],
            useFactory: (translateService: TranslateService) => new MyMatPaginatorIntl(translateService).getTranslations()
        }
    ]
})
export class AppComponentsModule { }
