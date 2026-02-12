import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {

  constructor(private router: Router) {}

  navigateTo(api: string) {
    switch(api) {
      case 'api1':
        this.router.navigate(['dataSource']);
        break;
      case 'api2':
        this.router.navigate(['control']);
        break;
      case 'api3':
        this.router.navigate(['pages']);
        break;
      case 'api4':
        this.router.navigate(['event']);
        break;

      case 'expenses':
        this.router.navigate(['expensesFromPages']);
        break;

      case 'expensesControl':
        this.router.navigate(['expensesControl']);
        break;
      case 'dsData':
        this.router.navigate(['dsData']);
        break;

    }
  }
}

