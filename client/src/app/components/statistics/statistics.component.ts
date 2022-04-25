import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics: any[] = [];
  datesForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statisticsService.getCategoryStatistics({startDate: '2000-01-01', endDate: '2100-01-01'}).subscribe((res: any) => {
      const transactionSum = res.totalAmount[0].totalAmount;
      const percentage = res.statistics.map((item: any) => {
        return {
          category: item._id,
          amount: Math.abs(item.amount),
          percentage: (Math.abs(item.amount/transactionSum)) * 100
        }
      });
      this.statistics = percentage;
    });
  }

  getStats() {
    this.statisticsService.getCategoryStatistics(this.datesForm.value).subscribe((res: any) => {
      const transactionSum = res.totalAmount[0].totalAmount;
      const percentage = res.statistics.map((item: any) => {
        return {
          category: item._id,
          amount: Math.abs(item.amount),
          percentage: (Math.abs(item.amount/transactionSum)) * 100
        }
      });
      this.statistics = percentage;
    });
  }
}
