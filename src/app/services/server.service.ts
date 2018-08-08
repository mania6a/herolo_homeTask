import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

 // url = 'http://localhost:3000';
  url = 'https://www.googleapis.com/books/v1/volumes?q=quilting';
  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.url + '&startIndex=0&maxResults=40');
  }
}
