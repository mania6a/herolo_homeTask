import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Book} from '../../models/book';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  form: FormGroup;
  maxDate = new Date();
  constructor(private dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Book) { }

  ngOnInit() {
   // const title = this.data ? this.transformWord(this.data.title) : '';
    const title = this.data ? this.data.title : '';
    const author = this.data ? this.data.authorName : '';
    const d = new Date();
    if (this.data) {
      d.setDate(+this.data.publishedDate.split('.')[0]);
      d.setMonth(+this.data.publishedDate.split('.')[1] - 1);
      d.setFullYear(+this.data.publishedDate.split('.')[2]);
    }
    const date = this.data ? d : '';
    this.form = new FormGroup({
      'title': new FormControl(title, [Validators.required,
        this.notContLatin.bind(this)]),
      'authorName': new FormControl(author, [Validators.required,
        this.notContLatin.bind(this)]),
      'publishedDate': new FormControl(date, [Validators.required])
    });
  }

  notContLatin(word: FormControl) {
    if (!word.value.match(/[A-Z, a-z]/g)) {
      return {
        'notLatin': true
      };
    }
    return null;
  }

 /*
    The method is used in case we want to see a correct title/ author name like with pipe
    transformWord(title) {
    const wordArray = title.trim().split(' ');
    const res = wordArray.map(e => {
      const word = e.match(/[A-Z, a-z]/g).join('');
      return word.charAt(0).toUpperCase().concat(word.slice(1)).trim();
    });
    return res.join(' ');
  }*/

  saveChanges() {
    const book = {
      'id': this.data ? this.data.id : '',
      'title': this.form.get('title').value.trim(),
      'authorName': this.form.get('authorName').value.trim(),
      'publishedDate': this.form.get('publishedDate').value.toLocaleString().slice(0, 10)
        .split('/').join('.')
    };
    this.dialogRef.close(book);
  }

  getErrorMessage(word) {
    return this.form.get(word).hasError('required') ? 'A mandotatory field'
      : this.form.get(word).hasError('notLatin') ? 'The field should contain Latin symbols' : '';
  }
}
