import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})
export class AuthUserComponent implements OnInit {
  userType:string;
  form: FormGroup;

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  constructor( ) {
    this.userType = "User";
    this.form  = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
   }

  ngOnInit(): void {
  }

}
