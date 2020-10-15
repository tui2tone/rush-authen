import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[appFormInput]',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  host: {
    class: 'flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 mr-2 rounded shadow focus:outline-none focus:shadow-outline form-control'
  }
})
export class FormInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
