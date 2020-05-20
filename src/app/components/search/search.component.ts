import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @Output() Close = new EventEmitter();

  searchOptions = ['All', 'Name', 'Description', 'Category', 'Organs'];
  configuredOptions = [];
  selectedSearchOption = 'Name';
  chooseSearchOption = false;
  programs = [];
  loading = false;

  programsToDisplay = [];
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
    this.loading = true;
    this.programs = this.backend.filterList(value, this.selectedSearchOption);
    console.log({
      programs: this.programs
    });
    this.programsToDisplay = [];
    this.nextSegment();
    this.loading = false;
  }

  nextSegment() {
    this.programsToDisplay = [
      ...this.programsToDisplay,
      ...this.programs.splice(0, 10)
    ];
  }
}
