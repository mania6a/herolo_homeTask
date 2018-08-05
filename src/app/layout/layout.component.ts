import { Component, OnInit } from '@angular/core';
import {ServerService} from '../services/server.service';
import {Book} from '../models/book';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  books: Array<Book>;
  constructor(private server: ServerService,
              private dialog: MatDialog,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.server.getBooks().subscribe((response: Array<Book>) => {
      this.books = response;
    }, (error => {
      this.showError(error.message);
    }));
  }

  showError(message) {
    this.snack.open(message, '', {
      duration: 3000,
      panelClass: 'error'
    });
  }

  deleteBook(ind) {
    this.books.splice(ind, 1);
  }

  addBook() {
    let exists = false;
    const dislogRef = this.dialog.open(EditDialogComponent, {});
    dislogRef.afterClosed().subscribe((data: Book) => {
    this.books.forEach((b) => {
        if (b.title.toLowerCase().localeCompare(data.title.toLowerCase()) === 0) {
          exists = true;
          this.showError('The book ' + data.title + ' already exists');
        }
    });
    if (!exists) {
      data.id = this.books[this.books.length - 1].id + 1;
      this.books.push(data);
    }
    });
  }

}
