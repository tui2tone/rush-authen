import { Directive, OnInit, OnDestroy, ElementRef, Input, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors, AuthState } from '../store/auth';

@Directive({
    selector: '[appPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {
    @Input() appPermission: string;
    @Input() permissionType: string;
    subscriber: any;
    permission: any;
    selector: any;

    constructor(
        private store$: Store<AuthState.State>,
        private el: ElementRef,
        public renderer: Renderer2
    ) { }

    ngOnInit() {
        this.selector = this.store$.select(AuthSelectors.selectPermissions);
        this.subscriber = this.selector.subscribe((value) => {
            this.permission = value;
            this.setElementDisplay()
        })
    }

    setElementDisplay() {
        if (this.el.nativeElement) {
            if (this.permission && this.appPermission) {
                const required = (this.appPermission + "." + this.permissionType).toLowerCase()
                if (this.permission.includes(required)) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', '');
                } else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            } else {
                this.renderer.setStyle(this.el.nativeElement, 'display', '');
            }
        }
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }

}
