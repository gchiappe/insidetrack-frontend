import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './ui/main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  },
  {
    path: 'main', pathMatch: 'full', component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
