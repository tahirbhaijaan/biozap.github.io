import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip-set',
  templateUrl: './chip-set.component.html',
  styleUrls: ['./chip-set.component.scss']
})
export class ChipSetComponent implements OnInit {

  @Input() chips = [];
  @Output() chipDelete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  delete(chip) {
    this.chipDelete.emit(chip);
  }
}
