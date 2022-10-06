import { Component, OnInit } from '@angular/core';
import { AuthUserComponent } from '../auth-user/auth-user.component';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent extends AuthUserComponent implements OnInit {

  constructor() {
    super();
    this.userType = "Admin";
  }

  override ngOnInit(): void {
  }

}
