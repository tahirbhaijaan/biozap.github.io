import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() programs = [];
  constructor() {
  }

  ngOnInit() {
  }

  removeCategory(program, category) {
    program.categories = program.categories.filter(categ => categ !== category);
  }

  removeOrgan(program, organ) {
    program.organs = program.organs.filter(categ => categ !== organ);
  }
}
