import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private injector: Injector) { }
  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error.name === 'HttpErrorResponse') {
      console.log(`HTTP Error Response: STATUS[${error.status}]`);
    } else {
      console.log(`Error Unknown Type Occurred: [${error.message}]`);
    }
  }
}
