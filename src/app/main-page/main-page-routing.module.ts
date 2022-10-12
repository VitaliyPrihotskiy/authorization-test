import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'graph/:id', component: GraphComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
