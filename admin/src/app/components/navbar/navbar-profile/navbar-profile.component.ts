import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar-profile',
    templateUrl: './navbar-profile.component.html',
    styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {
    @ViewChild('signoutConfirmModal') signoutConfirmModal: ConfirmModalComponent;
    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
    }

    onSignout() {
        this.signoutConfirmModal.open();
    }

    onSignoutConfirm() {
        this.auth.signout()
  }
}
