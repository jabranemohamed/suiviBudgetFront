import {Component, OnInit} from '@angular/core'
import {ThemeConstantService} from '../../shared/services/theme-constant.service';
import {StatisticService} from "../../shared/services/statistic.service";

@Component({
  templateUrl: './default-dashboard.component.html'
})

export class DefaultDashboardComponent implements OnInit {

  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  cyan = this.themeColors.cyan;
  gold = this.themeColors.gold;
  purple = this.themeColors.purple;
  red = this.themeColors.red;
  data: any

  constructor(private colorConfig: ThemeConstantService, private statisticService: StatisticService) {
  }


  ngOnInit(): void {
    var d = new Date();
    var n = d.getFullYear();
    var codeUL = sessionStorage.getItem('localUnit');
    console.log("enter her");
    this.statisticService.getStatByYearAndCode(n, codeUL).subscribe(data => {
      this.data = data;
      JSON.stringify(this.data );
    });
  }


}
