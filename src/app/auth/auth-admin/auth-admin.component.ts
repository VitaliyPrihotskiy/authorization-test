import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/shared/constants/user-type.constant';
import { AuthService } from 'src/app/shared/sevices/auth.service';
import { AuthUserComponent } from '../auth-user/auth-user.component';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent extends AuthUserComponent implements OnInit {

  constructor( router: Router, authService: AuthService ) {
    super(router,authService);
    this.userType = UserType.Admin;
  }
}
