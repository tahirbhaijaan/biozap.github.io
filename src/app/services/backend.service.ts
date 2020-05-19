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
  programs = [];

  allProgramsLoaded = false;

  constructor(
    private http: HttpClient
  ) {
    this.loadAll()
    .then((programs: any) => {
      this.programs = programs;
      this.allProgramsLoaded = true;
    })
    .catch(error => console.log({
      error
    }));
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
      if (!this.allProgramsLoaded) {
        this.loadAll()
        .then((programs: any) => {
          this.programs = programs;
          this.allProgramsLoaded = true;
          res(this.programSegment(pageNumber));
        })
        .catch(error => rej(error));
      } else {
        res(this.programSegment(pageNumber));
      }
    });
  }

  loadAll() {
    return new Promise((res, rej) => {
      this.http.get(`${this.adminUrl}/allPrograms`)
      .subscribe(res, rej);
    });
  }

  programSegment(pageNumber) {
    const segment = [];
    for (let i = 100 * pageNumber; i < 100 * (pageNumber + 1); i++) {
      if (i === this.programs.length) {
        return segment;
      }
      segment.push(this.programs[i]);
    }
    console.log({segment});
    return segment;
  }
}
