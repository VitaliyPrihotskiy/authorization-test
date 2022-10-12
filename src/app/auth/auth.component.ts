import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/sevices/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthInfoService } from '../shared/sevices/auth-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnDestroy, OnInit {
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

  constructor(
    private readonly authService: AuthService,
    private readonly authInfoService: AuthInfoService,
    private readonly router: Router
  ) {
    this.submit = false;
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.authInfoService.isAuthenticated()) {
      this.router.navigate(['main-page']);
    }
  }

  ngOnDestroy(): void {
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


    this.authService.auth(options)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => { },
        () => {
          this.submit = false;
          this.errorMsg = "Wrong email or password";
        }
      );
  }
}
