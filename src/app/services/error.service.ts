import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {Systemlog} from "./systemlog.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(
      private injector: Injector,
      private systemLogService: Systemlog
      ) {}

  async handleError(error: any) {
    const router = this.injector.get(Router);
    const data: any = {
      topic: 'Mobile App Error',
    };
    if (error.name === 'HttpErrorResponse') {
      data.stringField_1 = `HTTP Error Response in ${router.url}: [${error.message}]`;
      console.log(`HTTP Error Response in ${router.url}: [${error.message}]`);
    } else {
      data.stringField_1 = `Error Occurred in ${router.url}: [${error.message}]`;
      console.log(`Error Occurred in ${router.url}: [${error.message}]`);
      console.log(error)
    }
    if (this.systemLogService) this.systemLogService.logMessage(data);
  }
}
