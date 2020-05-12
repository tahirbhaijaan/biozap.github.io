import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuCollapsed = true;
  categories: any;
  constructor(
    private backend: BackendService
  ) { }

  async ngOnInit() {
    setTimeout(() => {
      this.backend.getCategories()
      .then(console.log, console.log);
    }, 5000);
  }

}
