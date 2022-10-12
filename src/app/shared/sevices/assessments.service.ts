import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assesment } from '../models/assesment.model';
import { GraphData } from '../models/graph-data.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

  constructor(private readonly http: HttpClient) { }

  getUserAssessments(): Observable<Assesment[]> {
    return this.http.get<Assesment[]>(environment.api.userAssessments);
  }

  getUserAssessmentGraph(id: number): Observable<GraphData> {
    const params = new HttpParams().set('id', id);

    return this.http.get<GraphData>(environment.api.userAssessmentGraph, { params });
  }
}
