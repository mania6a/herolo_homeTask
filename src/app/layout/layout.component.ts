import { Component, OnInit } from '@angular/core';
import {ServerService} from '../services/server.service';
import {Book} from '../models/book';
import {MatDialog} from '@angular/material';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {CheckBookService} from '../services/check-book.service';
import {ShowErrorService} from '../services/show-error.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  books: Array<Book>;
  constructor(private server: ServerService,
              private checkBook: CheckBookService,
              private dialog: MatDialog,
              private showError: ShowErrorService) { }

  ngOnInit() {
    this.server.getBooks().subscribe((response: Array<any>) => {

      this.books = response['items'].map((item) => {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          authorName: item.volumeInfo.authors,
          publishedDate: item.volumeInfo.publishedDate
        };
      });
    }, (error => {
      this.showError.showError(error.message);
    }));
  }

  deleteBook(ind) {
    this.books.splice(ind, 1);
  }

  addBook() {
    const dislogRef = this.dialog.open(EditDialogComponent, {});
    dislogRef.afterClosed().subscribe((data: Book) => {
      if (data) {
      const exists = this.checkBook.ifExists(this.books.map((b) => b.title), data.title);
      if (exists) {
        this.showError.showError('The book ' + data.title + ' already exists');
      } else {
        data.id = this.books.length ? (this.books[this.books.length - 1].id + 1) : 100000;
        this.books.push(data);
      }
    }
    });
  }
}
