import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {MatDialog} from '@angular/material';
import {Book} from '../../models/book';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input('book') book;
  @Output('deleteBook') deleteBook = new EventEmitter();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEdit() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.book
    });
    dialogRef.afterClosed().subscribe((data: Book) => {
       if (data) {
         this.book.title = data.title;
         this.book.authorName = data.authorName;
         this.book.publishedDate = data.publishedDate;
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
