import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordFormat'
})
export class WordFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const wordArray = value.trim().split(' ');
    const res = wordArray.map(e => {
      const word = e.match(/[A-Z, a-z]/g).join('');
      return word.charAt(0).toUpperCase().concat(word.slice(1));
    });
    return res.join(' ');
  }
}
