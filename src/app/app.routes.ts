import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './component/home/home';
import { ResponsePagetwo } from './component/response-pagetwo/response-pagetwo';
import { ResponsePagethree } from './component/response-pagethree/response-pagethree';
import { ResponsePageFour } from './component/response-page-four/response-page-four';
import { TestPageComponent } from './component/response/TestPageComponent';
import { ExpensesLogicFromPages } from './component/expenses-logic-from-pages/expenses-logic-from-pages';
import { ExpensesLogicFromControl } from './component/expenses-logic-from-control/expenses-logic-from-control';
import { ExpensesParent } from './component/expenses-parent/expenses-parent';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dataSource', component: TestPageComponent },
  { path: 'control', component: ResponsePagethree },
  { path: 'pages', component: ResponsePagetwo },
  { path: 'event', component: ResponsePageFour },
   { path: 'expensesFromPages', component: ExpensesLogicFromPages },
   { path: 'expensesControl', component: ExpensesLogicFromControl },
   
    { path: 'dsData', component: ExpensesParent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
