import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assesment } from '../shared/models/assesment.model';
import { SuccessResponse } from '../shared/models/response.model';
import { User } from '../shared/models/user.model';
import { AssessmentsService } from '../shared/sevices/assessments.service';
import { AuthService } from '../shared/sevices/auth.service';
import { UsersService } from '../shared/sevices/users.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  assessments: Assesment[] = [];
  userData: SuccessResponse | undefined;
  allUsers: User[] = [];
  currentTab: number = 0;

  constructor(
    private authService: AuthService,
    private assessmentsService: AssessmentsService,
    private cdr:ChangeDetectorRef,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUserAssessments();
    if (this.userData?.role === "Admin") {
      this.getUsers();
    }
  }

  getUserData(): void {
    this.userData = this.authService.userData;
  }

  getUserAssessments(): void {
    if (this.userData){
      this.assessmentsService.getUserAssessments(this.userData.token)
        .subscribe(result => {
          this.assessments = result;
          this.cdr.detectChanges();
        })
    }
  }

  showGraph(id: number): void{
    const path = 'main-page/graph'
    this.router.navigate([path,id]);
  }

  getUsers(): void {
    if (this.userData){
      this.usersService.getUsers(this.userData.token)
        .subscribe(result => {
          this.allUsers = result;
          this.cdr.detectChanges();
        })
    }
  }

}
