import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { CostingReportInput } from '../models/report/costingReport';
import { CostingReportOutput } from '../models/report/costingReportOutput';


@Injectable({
  providedIn: 'root'
})
export class CostingreportService {

  private costingReportUrl: string = `${Configuration.apiURL}api/report/costing`;

  constructor(private http: HttpClient) { }

  getCostingReport(costingReportInput: CostingReportInput): Observable<CostingReportOutput[]> {
      return this.http.post<CostingReportOutput[]>(this.costingReportUrl, costingReportInput);
  }

 
}
