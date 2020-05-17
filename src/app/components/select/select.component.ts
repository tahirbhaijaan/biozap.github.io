import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {

  @Input() heading = 'Select Options';
  @Input() options = [];
  @Output() selected = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  submit() {
    const response = [];
    this.options.forEach(option => {
      if (option.selected) {
        response.push(option.value);
      }
    });
    this.selected.emit(response);
  }

}
