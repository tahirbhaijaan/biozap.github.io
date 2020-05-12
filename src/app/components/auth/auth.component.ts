import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  password;

  erronous = false;
  loading = false;
  @Output() approved = new EventEmitter();

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.erronous = false;
    this.backend.login(this.password)
      .then(response => {
        this.loading = false;
        this.approved.emit();
      })
      .catch(error => {
        this.password = '';
        this.loading = false;
        this.erronous = true;
      });
  }

}
