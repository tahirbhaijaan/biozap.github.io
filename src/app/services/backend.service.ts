import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  adminUrl = 'http://localhost:3000/admin';
  adminToken = '';

  constructor(
    private http: HttpClient
  ) {
  }

  login(passkey) {
    return new Promise((res, rej) => {
      this.http.post(`${this.adminUrl}/login`, {
        token: passkey
      }).subscribe((resp: {
        accessToken: string
      }) => {
        this.adminToken = resp.accessToken;
        setTimeout(() => {
          res(resp);
        }, 3000);
      }, error => {
        setTimeout(() => {
          rej(error);
        }, 3000);
      });
    });
  }

  getCategories() {
    return new Promise((res, rej) => {
      this.http.post(`${this.adminUrl}/categories`, null, {
        headers: {
          token: this.adminToken
        }
      }).subscribe(res, rej);
    });
  }

  saveCategory() {

  }
}
