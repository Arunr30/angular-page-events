import { RouterModule, Routes } from '@angular/router';
import { Home } from './component/home/home';
import { ResponsePagetwo } from './component/response-pagetwo/response-pagetwo';
import { ResponsePagethree } from './component/response-pagethree/response-pagethree';
import { ResponsePageFour } from './component/response-page-four/response-page-four';
import { TestPageComponent } from './component/response/TestPageComponent';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dataSource', component: TestPageComponent },
  { path: 'control', component: ResponsePagetwo },
  { path: 'pages', component: ResponsePagethree },
  { path: 'event', component: ResponsePageFour }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
