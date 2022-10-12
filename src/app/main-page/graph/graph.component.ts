import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphData } from 'src/app/shared/models/graph-data.model';
import { AssessmentsService } from 'src/app/shared/sevices/assessments.service';
import { AuthService } from 'src/app/shared/sevices/auth.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  id!: number;
  graphData: GraphData | null = null;

  constructor(
    private route: ActivatedRoute,
    private assessmentsService: AssessmentsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.['id'];
    const token = this.getUserToken();
    this.assessmentsService.getUserAssessmentGraph(token, this.id).subscribe( data => console.log(data))
  }

  getUserToken(): string {
    return this.authService.userData?.token !== undefined?
              this.authService.userData?.token :
              '';
  }

}
