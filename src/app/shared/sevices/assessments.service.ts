import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assesment } from '../models/assesment.model';
import { GraphData } from '../models/graph-data.model';

@Injectable({
  providedIn: 'root'
 })
export class AssessmentsService {

  constructor(public http: HttpClient) { }

  getUserAssessments(token: string): Observable<Assesment[]> {
    const headers = new HttpHeaders().set( "X-Token", token);
    return this.http.get<Assesment[]>(environment.api.userAssessments, {headers});
  }

  getUserAssessmentGraph(token: string, id: number): Observable<GraphData> {
    const headers = new HttpHeaders().set( "X-Token", token);
    const path = environment.api.userAssessmentGraph + "/" + id;
    return this.http.get<GraphData>(path, {headers});
  }
}