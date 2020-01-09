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
  data:any
  budget_notifie:any;
  budget_Estime1:any;
  budget_Estime2:any;
  budget_Estime3:any;
  budget_Estime4:any;

  constructor(private colorConfig: ThemeConstantService,private statisticService:StatisticService) {
  }


  ngOnInit(): void {
    this.statisticService.getStatByYearAndCode(2019,'SDP').subscribe(data => {
      this.data = data;
      for( let prop in data ){
        console.log( data[prop] );
        // @ts-ignore
        if('Redevance' == data[prop].grandeActivite){
          console.log("entrer her");
          // @ts-ignore
          this.budget_notifie = data[prop].estime1;
          // @ts-ignore
          this.budget_Estime1 = data[prop].estime2;
          // @ts-ignore
          this.budget_Estime2 = data[prop].estime3;
          // @ts-ignore
          this.budget_Estime3 = data[prop].estime4;
          // @ts-ignore
          this.budget_Estime4 = data[prop].estime4;
        }
      }
    });
  }


}
