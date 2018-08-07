import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckBookService {

  constructor() { }

  ifExists(array: Array<string>, book: string) {
    return array.some((title) => {
      return this.transformWord(title).localeCompare(this.transformWord(book)) === 0;
    });
  }

  transformWord(title) {
    const wordArray = title.trim().split(' ');
    const res = [];
    wordArray.forEach(e => {
      if (e !== '') {
        const word = e.match(/[A-Z, a-z]/g).join('');
        res.push(word.toLowerCase());
      }
    });
    return res.join(' ');
  }
}
