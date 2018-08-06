import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {MatDialog} from '@angular/material';
import {Book} from '../../models/book';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {CheckBookService} from '../../services/check-book.service';
import {ShowErrorService} from '../../services/show-error.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input('book') book;
  @Input('books') books;
  @Output('deleteBook') deleteBook = new EventEmitter();
  constructor(private dialog: MatDialog,
              private checkBook: CheckBookService,
              private showError: ShowErrorService) { }

  ngOnInit() {
  }

  openEdit() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.book
    });
    dialogRef.afterClosed().subscribe((data: Book) => {
       if (data) {
         const exixts = this.checkBook.ifExists(this.books.map((b) => b.title), data.title);
         if (exixts && this.book.title.trim().toLowerCase()
             .localeCompare(data.title.trim().toLowerCase()) !== 0) {
           this.showError.showError('The book ' + data.title + ' already exists');
         } else {
           this.book.title = data.title;
           this.book.authorName = data.authorName;
           this.book.publishedDate = data.publishedDate;
         }
       }
    });
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.book.title
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteBook.emit();
      }
    });
  }
}
