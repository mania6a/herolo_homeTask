import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.title = this.data;
  }

}
