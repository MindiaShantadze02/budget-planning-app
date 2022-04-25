import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8000/statistics';

  constructor(
    private http: HttpClient
  ) { }

  getCategoryStatistics(dates: any) {
    return this.http.post(`${this.apiUrl}/categories`, dates);
  }
}
