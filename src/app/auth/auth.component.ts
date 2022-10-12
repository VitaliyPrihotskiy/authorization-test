import { UserType } from './../shared/constants/user-type.constant';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/sevices/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  private readonly ngUnsubscribe = new Subject<void>();

  form: FormGroup;
  submit: boolean;
  errorMsg: string = "";

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  constructor(private authService: AuthService) {
    this.submit = false;
    this.form  = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onFormSubmit(): void {
    this.submit = true;
    if (this.form.invalid) {
      this.submit = false;
      return;
    }

    const form = this.form.value;
    const options = {
      email: form.email,
      password: form.password,
    };
    try {
      this.authService.auth(options)
      // .pipe(takeUntil(this.ngUnsubscribe))//може щось з підпискою, впринципі вона тут не треба
      // .subscribe((auth: any) => {
      //   console.log(auth) //не спрацьовує
      // })
    }
    catch (error) {
      console.log(error);
      this.submit = false;
      this.errorMsg = "Wrong email or password";
    }
  }

}
