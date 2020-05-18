import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuCollapsed = true;
  categories = [];
  catName = '';
  loading = false;

  @Input() menuLeft = false;
  constructor(
    private backend: BackendService
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.backend.getCategories()
    .then((cats: any) => {
      this.categories = cats;
      this.loading = false;
    })
    .catch(error => {
      console.log({
        error
      });
      this.loading = false;
    });
    this.backend.categoryUpdated.subscribe(newCategories => {
      this.categories = newCategories;
    });
  }

  addNew() {
    this.loading = true;
    if (!this.catName.length) {
      return;
    }
    this.backend.saveCategory(this.catName.trim().toLowerCase())
    .then(() => {
      this.loading = false;
      this.catName = '';
    })
    .catch(error => {
      console.log({
        error
      });
      this.loading = false;
    });
  }

  async deleteCategory(category) {
    this.loading = true;
    this.backend.removeCategory(category)
    .then(success => {
      this.loading = false;
    })
    .catch(error => {
      this.loading = false;
    });
  }

}
