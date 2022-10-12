import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { AssesmentComponent } from './assesment/assesment.component';
import { GraphComponent } from './graph/graph.component';


@NgModule({
  declarations: [
    MainPageComponent,
    AssesmentComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ChartModule
  ]
})
export class MainPageModule { }
