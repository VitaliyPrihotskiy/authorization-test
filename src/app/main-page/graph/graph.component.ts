import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphData } from 'src/app/shared/models/graph-data.model';
import { AssessmentsService } from 'src/app/shared/sevices/assessments.service';
import { AuthService } from 'src/app/shared/sevices/auth.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {
  id!: number;
  graphData: GraphData | null = null;
  charType: string = 'bar';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assessmentsService: AssessmentsService,
    private authService: AuthService,
    private cdr:ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.['id'];
    const token = this.getUserToken();
    this.assessmentsService.getUserAssessmentGraph(token, this.id)
      .subscribe( data => {console.log(data)
        this.charType = data.type;
        this.graphData = this.toChartData(data);
        this.cdr.detectChanges();
      })
  }

  getUserToken(): string {
    return this.authService.userData?.token !== undefined? this.authService.userData?.token : '';
  }

  toChartData(incomeData: GraphData): any {
    const labels: string[] = [];
    const data: number[] = [];
    Object.keys(incomeData.data).forEach( key => {
      labels.push(key);
    });
    Object.values(incomeData.data).forEach( value => {
      data.push(value);
    })
    const chartData = {
      labels,
      datasets:[{label:"percent", data}]
    };
    console.log(chartData)
    return chartData;
  }

  toMainPage(): void {
    this.router.navigate(['main-page']);
  }
}
