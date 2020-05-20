import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { BackendService } from './../../services/backend.service';

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
  programs;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;


  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      map((event: any) => event.target.value),
      filter(res => res.length > 2),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => this.search(value));
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

  search(value) {
    this.programs = this.backend.filterList(value, this.selectedSearchOption);
  }
}
