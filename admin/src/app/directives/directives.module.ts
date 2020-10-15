import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBackDirective } from './btn-back.directive';
import { DisableLinkDirective } from './disable-link.directive';
import { PermissionDirective } from './permission.directive';
import { AutofocusDirective } from './autofocus.directive';
import { TextHighlightDirective } from './text-highlight.directive';

@NgModule({
    declarations: [
        BtnBackDirective,
        DisableLinkDirective,
        PermissionDirective,
        AutofocusDirective,
        TextHighlightDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BtnBackDirective,
        DisableLinkDirective,
        PermissionDirective,
        AutofocusDirective,
        TextHighlightDirective
    ]
})
export class AppDirectivesModule { }
