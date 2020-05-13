import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = false;
  addNew = false;
  collapsed = false;
  collapser;
  programs = [];
  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
    this.expand();
  }

  update() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  loadPage(tab) {
    this.backend.loadPage(tab)
    .then((content: any) => {
      this.programs = content;
    })
    .catch(error => {
      console.log({
        error
      });
    });
  }

  addNewProgram() {
    this.addNew = true;
  }

  expand() {
    this.collapsed = false;
    try {
      clearInterval(this.collapser);
      this.collapser = setInterval(() => this.collapsed = true, 3000);
    } catch (error) {
      this.collapser = setInterval(() => this.collapsed = true, 3000);
    }
  }

}
