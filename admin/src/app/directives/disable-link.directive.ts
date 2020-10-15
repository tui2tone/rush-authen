import { Directive, Input, Optional } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Directive({
    selector: '[routerLink][disableLink]'
})
export class DisableLinkDirective {

    @Input() disableLink: boolean;

    constructor(
        // Inject routerLink
        @Optional() routerLink: RouterLink,
        @Optional() routerLinkWithHref: RouterLinkWithHref
    ) {

        const link =  routerLink || routerLinkWithHref;

        // Save original method
        const onClick = link.onClick;

        // Replace method
        link.onClick = (...args) => {
            if (this.disableLink) {
                return routerLinkWithHref? false: true;
            } else {
                return onClick.apply(link, args);
            }
        };
    }

}