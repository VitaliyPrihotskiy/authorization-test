import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphData } from 'src/app/shared/models/graph-data.model';
import { AssessmentsService } from 'src/app/shared/sevices/assessments.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {
  graphData: GraphData | null = null;
  charType: string = 'bar';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assessmentsService: AssessmentsService,
    private cdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params?.['id'];

    this.assessmentsService.getUserAssessmentGraph(id)
      .subscribe( data => {
        this.charType = data.type;
        this.graphData = this.toChartData(data);
        this.cdr.detectChanges();
      })
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
    return chartData;
  }

  toMainPage(): void {
    this.router.navigate(['main-page']);
  }
}
