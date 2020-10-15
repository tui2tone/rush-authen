import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: '[appExpandAnimate]',
  templateUrl: './expand-animate.component.html',
  styleUrls: ['./expand-animate.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '{{ expandHeight }}px',
        opacity: 1
      }), {
        params: { expandHeight: '50' }
      }),
      state('closed', style({
        height: '0px',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ]),
  ]
})
export class ExpandAnimateComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() expandHeight: Number = 50;
  @HostBinding('@openClose') get openClose() {
    return this.isOpen ? { value: 'open', params: { expandHeight: this.expandHeight } } : { value: 'closed', params: { expandHeight: this.expandHeight } };
  }

  constructor() { }

  ngOnInit() {
  }

}
