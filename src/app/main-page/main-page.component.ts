import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { USER_ROLE } from '../shared/enums/user.enums';
import { Assesment } from '../shared/models/assesment.model';
import { SuccessResponse } from '../shared/models/response.model';
import { User } from '../shared/models/user.model';
import { AssessmentsService } from '../shared/sevices/assessments.service';
import { AuthInfoService } from '../shared/sevices/auth-info.service';
import { UsersService } from '../shared/sevices/users.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  assessments$: Observable<Assesment[]> = of([]);
  allUsers$: Observable<User[]> = of([]);
  currentTab: number = 0;

  userData: SuccessResponse | null = null;

  constructor(
    private readonly authInfoService: AuthInfoService,
    private assessmentsService: AssessmentsService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUserAssessments();
    this.getUsers();
  }

  get isAdmin(): boolean {
    return this.userData?.role === USER_ROLE.ADMIN;
  }

  getUserData(): void {
    this.userData = this.authInfoService.userData;
  }

  getUserAssessments(): void {
    if (this.userData) {
      this.assessments$ = this.assessmentsService.getUserAssessments();
    }
  }

  showGraph(id: number): void {
    this.router.navigate(['main-page', 'graph', id]);
  }

  getUsers(): void {
    if (!this.isAdmin) {
      return;
    }

    this.allUsers$ = this.usersService.getUsers();
  }
}
