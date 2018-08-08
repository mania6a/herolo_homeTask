import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordFormat'
})
export class WordFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const wordArray = value.trim().split(' ');
    const res = [];
    wordArray.forEach(e => {
      if (e !== '' && e.match(/[A-Z,a-z,0-9]/g)) {
        const word = e.match(/[A-Z,a-z,0-9]/g).join('');
        res.push(word.charAt(0).toUpperCase().concat(word.slice(1)));
      }
    });
    return res.join(' ');
  }
}
