import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() programs = [];
  @Input() padding = '2rem';
  addCateg = false;
  addOrgan = false;
  catPanelOptions;
  orgPanelOptions;
  loading = true;

  editingIndex = 0;
  constructor(
    private backend: BackendService
  ) {
  }

  ngOnInit() {

  }

  removeCategory(program, category) {
    program.categories = program.categories.filter(categ => categ !== category);
  }

  removeOrgan(program, organ) {
    program.organs = program.organs.filter(categ => categ !== organ);
  }

  async showCatAddPanel(program) {
    this.editingIndex = program.index - this.programs[0].index;
    this.loading = true;
    const programCategs = program.categories;
    const categories = (await this.backend.getCategories() as any).filter(category => {
      return category.split(':')[0] !== 'organ';
    });
    this.catPanelOptions = [];
    categories.forEach(category => {
      this.catPanelOptions.push({
        value: category,
        selected: programCategs.indexOf(category) >= 0
      });
    });
    this.loading = false;
    this.addCateg = true;
  }

  async showOrgAddPanel(program) {
    this.editingIndex = program.index - this.programs[0].index;
    this.loading = true;
    const programOrgans = program.organs;
    const organs = (await this.backend.getCategories() as any).filter(organ => {
      return organ.split(':')[0] === 'organ';
    });
    this.orgPanelOptions = [];
    organs.forEach(organ => {
      this.orgPanelOptions.push({
        value: organ.split(':')[1],
        selected: programOrgans.indexOf(organ) >= 0
      });
    });
    this.loading = false;
    this.addOrgan = true;
  }

  setCategory(categs) {
    this.addCateg = false;
    this.programs[this.editingIndex].categories = categs;
  }
  setOrgans(organs) {
    this.addOrgan = false;
    this.programs[this.editingIndex].organs = organs;
  }
}
