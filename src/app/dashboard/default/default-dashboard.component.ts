import {Component} from '@angular/core'
import {ThemeConstantService} from '../../shared/services/theme-constant.service';

@Component({
  templateUrl: './default-dashboard.component.html'
})

export class DefaultDashboardComponent {

  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  cyan = this.themeColors.cyan;
  gold = this.themeColors.gold;
  purple = this.themeColors.purple;
  purpleLight = this.themeColors.purpleLight;
  red = this.themeColors.red;

  constructor(private colorConfig: ThemeConstantService) {
  }


  salesChartLabels: string[] = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  salesChartType = 'bar';
  salesChartColors: Array<any> = [
    {
      backgroundColor: this.themeColors.purple,
      borderWidth: 0
    },
    {
      backgroundColor: this.themeColors.purpleLight,
      borderWidth: 0
    }
  ];
  salesChartData: any[] = [
    {
      data: [20, 30, 35, 45, 55, 45],
      label: 'Online'
    },
    {
      data: [25, 35, 40, 50, 60, 50],
      label: 'Offline'
    }
  ];

  salesChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        categoryPercentage: 0.35,
        barPercentage: 0.70,
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Month'
        },
        gridLines: false,
        ticks: {
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Value'
        },
        gridLines: {
          drawBorder: false,
          offsetGridLines: false,
          drawTicks: false,
          borderDash: [3, 4],
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 4]
        },
        ticks: {
          max: 80,
          stepSize: 20,
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }]
    }
  };

  fileList = [
    {
      icon: "file-word",
      name: "Documentation.doc",
      color: this.blue,
      size: "1.2MB"
    },
    {
      icon: "file-excel",
      name: "Expensess.xls",
      color: this.cyan,
      size: "518KB"
    },
    {
      icon: "file-text",
      name: "Receipt.txt",
      color: this.purple,
      size: "355KB"
    },
    {
      icon: "file-word",
      name: "Project Requirement.doc",
      color: this.blue,
      size: "1.6MB"
    },
    {
      icon: "file-pdf",
      name: "App Flow.pdf",
      color: this.red,
      size: "19.8MB"
    },
    {
      icon: "file-ppt",
      name: "Presentation.ppt",
      color: this.gold,
      size: "2.7MB"
    },
  ]


}
