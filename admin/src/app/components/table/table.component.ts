import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[appTable]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {
    class: 'text-left w-full border-collapse'
  }
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
