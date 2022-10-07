import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { AuthComponent } from './auth.component';

// const routes: Routes = [
//   {path: '', component: AuthUserComponent}
// ]
const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./auth-user/auth-user.module').then(m => m.AuthUserModule)
  },
  {
    path: "admin", loadChildren: () => import('./auth-admin/auth-admin.module').then(m => m.AuthAdminModule)
  }
]

// const routes: Routes = [
//   {
//     path: '',
//     component: AuthComponent,
//     children: [
//       { path: '', loadChildren: () => import('./auth-user/auth-user.module').then(m => m.AuthUserModule) },
//       { path: "admin", loadChildren: () => import('./auth-admin/auth-admin.module').then(m => m.AuthAdminModule) },
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
