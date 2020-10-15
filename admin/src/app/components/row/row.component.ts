import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[appRow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  host: {
    class: 'flex flex-wrap -mx-3'
  }
})
export class RowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
