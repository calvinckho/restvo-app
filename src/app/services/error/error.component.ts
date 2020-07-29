import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  normalError() {
    const babies = foo;
    console.log('This is normal error without a try catch');
  }
  errorWithCatch() {
    try {
      const babies = foo;
    } catch (error) {
      console.log(' — Error is handled gracefully: ', error.name);
    }
    console.log(' — Execution continues without app breaking');
  }
}
