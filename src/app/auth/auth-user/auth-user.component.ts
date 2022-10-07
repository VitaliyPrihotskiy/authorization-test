import { UserType } from './../../shared/constants/user-type.constant';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/sevices/auth.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})
export class AuthUserComponent implements OnInit {
  userType: UserType;
  form: FormGroup;
  submit: boolean;

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  get getOtherUserType(): string {
    return this.userType === UserType.User ? UserType.Admin : UserType.User;
  }

  get getRouterLink(): string {
    return this.userType === UserType.User ? UserType.Admin : "";
  }

  constructor( private router: Router, private authService: AuthService) {
    this.userType = UserType.User;
    this.submit = false;
    this.form  = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    this.submit = true;
    if (this.form.invalid) {
      this.submit = false;
      return;
    }
    const form = this.form.value;
    const options = {
      userType: this.userType,
      email: form.email,
      password: form.password,
    };
    this.authService
      .auth(options)
      // .subscribe(
      //   (response:any) => {
      //     const path = "main-page";
      //     this.router.navigateByUrl(path);
      //   },
      //   (error:any) => {
      //     this.submit = false;
      //     console.log(error);
      //   }
      // );
  }
}
