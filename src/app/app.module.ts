import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { BookComponent } from './layout/book/book.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import { WordFormatPipe } from './pipes/word-format.pipe';
import { EditDialogComponent } from './layout/edit-dialog/edit-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DeleteDialogComponent } from './layout/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BookComponent,
    WordFormatPipe,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  entryComponents: [EditDialogComponent, DeleteDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [WordFormatPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
