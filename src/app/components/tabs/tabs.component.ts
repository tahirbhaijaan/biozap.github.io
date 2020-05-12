import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabs = [];
  activated = 0;
  @Output() activation = new EventEmitter();
  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
    this.backend.tabLength()
    .then((tabs: any) => {
      for (let i = 0; i < tabs.length; i++) {
        this.tabs.push(i);
      }
    })
    .catch(error => console.log({
      error
    }));
  }

  activate(tab) {
    this.activated = tab;
    this.activation.emit(tab);
  }

}
