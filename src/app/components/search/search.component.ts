import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchOptions = ['All', 'Name', 'Description', 'Categoy', 'Organs'];
  configuredOptions = [];
  selectedSearchOption = 'Name';
  chooseSearchOption = false;
  constructor() { }

  ngOnInit() {
  }

  configureOptions() {
    this.configuredOptions = [];
    this.searchOptions.forEach(option => {
      this.configuredOptions.push({
        value: option,
        selected: option === this.selectedSearchOption
      });
    });
    this.chooseSearchOption = true;
  }

  setSearchOption([option]) {
    this.selectedSearchOption = option;
    this.chooseSearchOption = false;
  }

  log(X) {
    console.log(X);
  }
}
