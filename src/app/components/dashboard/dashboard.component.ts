import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = false;
  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
  }

  update() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  loadPage(tab) {
    this.backend.loadPage(tab)
    .then(content => {
      console.log({
        content
      });
    })
    .catch(error => {
      console.log({
        error
      });
    });
  }

}
