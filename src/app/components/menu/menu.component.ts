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
  }

  addNew() {
    this.loading = true;
    if (!this.catName.length) {
      return;
    }
    this.backend.saveCategory(this.catName)
    .then(() => {
      this.loading = false;
      this.categories.push(this.catName.trim().toLowerCase());
      this.catName = '';
    })
    .catch(error => {
      console.log({
        error
      });
      this.loading = false;
    });
  }
}
