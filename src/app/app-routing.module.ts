import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './shared/guards/authGuard.service';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: "main-page", pathMatch: 'full' },
      { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      {
        path: "main-page",
        loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule),
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
