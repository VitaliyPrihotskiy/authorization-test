import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assesment } from '../shared/models/assesment.model';
import { SuccessResponse } from '../shared/models/response.model';
import { AssessmentsService } from '../shared/sevices/assessments.service';
import { AuthService } from '../shared/sevices/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  assessments: Assesment[] = [];
  userData: SuccessResponse | undefined;
  currentTab = 0;
  constructor(
    private authService: AuthService,
    private assessmentsService: AssessmentsService,
    private cdr:ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUserAssessments();
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
  showGraph(id: number){
    const path = 'main-page/graph'
    this.router.navigate([path,id]);
  }

}
