import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        res(resp);
      }, error => {
        rej(error);
      });
    });
  }

  getCategories() {
    return new Promise((res, rej) => {
      this.http.get(`${this.adminUrl}/categories`).subscribe(res, rej);
    });
  }

  saveCategory(category) {
    return new Promise((res, rej) => {
      this.http.post(`${this.adminUrl}/categories`, {
        category
      }).subscribe(res, rej);
    });
  }

  tabLength() {
    return new Promise((res, rej) => {
      this.http.get(`${this.adminUrl}/tabs`)
      .subscribe(res, rej);
    });
  }

  loadPage(pageNumber) {
    return new Promise((res, rej) => {
      this.http.get(`${this.adminUrl}/programs/${pageNumber}`)
      .subscribe(res, rej);
    });
  }
}
