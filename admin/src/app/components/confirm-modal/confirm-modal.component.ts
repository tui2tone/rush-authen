import { Component, OnInit, Output, EventEmitter, Input, AfterContentInit } from '@angular/core';
import { ConfirmModalViewComponent } from './confirm-modal-view/confirm-modal-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

    @Output() onConfirm: EventEmitter<boolean> = new EventEmitter();
    @Output() onCancel: EventEmitter<boolean> = new EventEmitter();
    @Input() title: string;
    @Input() content: string;
    @Input() btnCancel: string;
    @Input() btnConfirm: string;
    identifyId: string;

    constructor(
        public dialog: MatDialog
    ) { }

    open() {
        const dialogRef = this.dialog.open(ConfirmModalViewComponent, {
            width: '400px',
            data: {
                title: this.title,
                content: this.content,
                btnCancel: this.btnCancel,
                btnConfirm: this.btnConfirm
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.confirm()
            } else {
                this.cancel()
            }
        });
    }

    ngOnInit() {
        this.identifyId = Math.random().toString(36).slice(2)
    }

    confirm() {
        this.onConfirm.emit(true)
    }

    cancel() {
        this.onCancel.emit(true)
    }

}
