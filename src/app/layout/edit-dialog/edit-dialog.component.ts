import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Book} from '../../models/book';
import {CheckBookService} from '../../services/check-book.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  form: FormGroup;
  maxDate = new Date();
  constructor(private dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Book,
              private checkBook: CheckBookService) { }

  ngOnInit() {
   // const title = this.data ? this.transformWord(this.data.title) : '';
    const title = this.data ? this.data.title : '';
    const author = this.data ? this.data.authorName.toString() : '';
    const d = new Date();
    if (this.data) {
      d.setFullYear(+this.data.publishedDate.split('-')[0]);
      d.setMonth(this.data.publishedDate.length === 4 ? 0 :
        +this.data.publishedDate.split('-')[1] - 1);
      d.setDate(this.data.publishedDate.length === 4 || 7 ? 1 :
        +this.data.publishedDate.split('-')[2]);
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
    if (!word.value.match(/[A-Z,a-z]/g)) {
      return {
        'notLatin': true
      };
    }
    return null;
  }

  saveChanges() {
    const book = {
      'id': this.data ? this.data.id : '',
      'title': this.checkBook.transformWord(this.form.get('title').value),
      'authorName': this.checkBook.transformWord(this.form.get('authorName').value),
      'publishedDate': this.form.get('publishedDate').value.toLocaleString().slice(0, 10)
        .split('/').reverse().join('-')
    };
    this.dialogRef.close(book);
  }

  getErrorMessage(word) {
    return this.form.get(word).hasError('required') ? 'A mandotatory field'
      : this.form.get(word).hasError('notLatin') ? 'The field should contain Latin symbols' : '';
  }
}
