import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  adminUrl = 'http://localhost:3000/admin';
  adminToken = '';
  categories = [];
  categoryUpdated = new BehaviorSubject([]);

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
      if (this.categories.length) {
        return res(this.categories);
      }
      this.http.get(`${this.adminUrl}/categories`).subscribe((cats: any) => {
        this.categories = cats;
        res(cats);
      }, rej);
    });
  }

  saveCategory(category) {
    return new Promise((res, rej) => {
      this.categories = this.categories.filter(cat => category !== cat);
      this.categories.push(category);
      this.categoryUpdated.next(this.categories);
      this.http.post(`${this.adminUrl}/categories`, {
        category
      }).subscribe(res, rej);
    });
  }

  removeCategory(category) {
    return new Promise((res, rej) => {
      this.categories = this.categories.filter(cat => category !== cat);
      this.categoryUpdated.next(this.categories);
      this.http.post(`${this.adminUrl}/deleteCategory`, {
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
