import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  @Output() closed = new EventEmitter();
  categories;
  freq = {
    v: undefined,
    t: undefined
  };
  program = {
    name: '',
    description: '',
    frequencies: [],
    categories: [],
    organs: []
  };
  loading = true;

  panel = {
    cat: {
      options: [],
      show: false
    },
    org: {
      options: [],
      show: false
    }
  };
  constructor(
    private backend: BackendService
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.categories = await this.backend.getCategories();
    console.log(this.categories);
    this.backend.categoryUpdated.subscribe(categs => this.categories = categs);
    this.loading = false;
  }

  async showCatPanel() {
    this.panel.cat.options = [];
    this.categories = await this.backend.getCategories();
    this.categories.forEach(category => {
      if (category.split(':')[0] !== 'organ') {
        if (this.program.categories.indexOf(category) >= 0) {
          this.panel.cat.options.push({
            value: category,
            selected: true
          });
        } else {
          this.panel.cat.options.push({
            value: category,
            selected: false
          });
        }
      }
    });
    this.panel.cat.show = true;
  }

  async showOrgPanel() {
    this.panel.org.options = [];
    this.categories = await this.backend.getCategories();
    this.categories.forEach(category => {
      if (category.split(':')[0] === 'organ') {
        const organ = category.split(':')[1];
        if (this.program.organs.indexOf(organ) >= 0) {
          this.panel.org.options.push({
            value: organ,
            selected: true
          });
        } else {
          this.panel.org.options.push({
            value: organ,
            selected: false
          });
        }
      }
    });
    this.panel.org.show = true;
  }

  removeCategory(category) {
    this.program.categories = this.program.categories.filter(cat => cat !== category);
  }
  removeOrgan(organ) {
    this.program.organs = this.program.organs.filter(org => org !== organ);
  }
  setOrgans(event) {
    this.panel.org.show = false;
    this.program.organs = event;
  }
  setCategories(event) {
    this.panel.cat.show = false;
    this.program.categories = event;
  }
  addFrequency() {
    if (!this.freq.t || !this.freq.v ) {
      return;
    }
    this.program.frequencies.push(this.freq);
    this.freq = {
      v: undefined,
      t: undefined
    };
  }
}
