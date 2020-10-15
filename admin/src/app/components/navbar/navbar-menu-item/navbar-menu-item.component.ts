import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[appNavbarMenuItem]',
  templateUrl: './navbar-menu-item.component.html',
  styleUrls: ['./navbar-menu-item.component.scss'],
  host: {
    class: 'border-l outline-none p-4 text-md h-full'
  }
})
export class NavbarMenuItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
