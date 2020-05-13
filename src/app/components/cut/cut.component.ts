import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.scss']
})
export class CutComponent implements OnInit {

  @Output() closed = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
