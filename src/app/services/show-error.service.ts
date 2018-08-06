import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorService {

  constructor(private snack: MatSnackBar) { }

  showError(message) {
    this.snack.open(message, '', {
      duration: 3000,
      panelClass: 'error'
    });
  }
}
