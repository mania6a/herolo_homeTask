import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckBookService {

  constructor() { }

  ifExists(array: Array<string>, book: string) {
    return array.some((title) => {
      return title.trim().toLowerCase().localeCompare(book.trim().toLowerCase()) === 0;
    });
  }
}
