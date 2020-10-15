import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[appLoader]',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() appLoader: boolean = false;
  constructor() { }

  ngOnInit() {
      
  }

}
