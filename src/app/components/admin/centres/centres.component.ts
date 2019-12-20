import {Component, OnInit} from '@angular/core';
import {TableService} from "../../../shared/services/table.service";
import {CentreService} from "../../../shared/services/centre.service";

@Component({
  selector: 'app-centres',
  templateUrl: './centres.component.html',
  styleUrls: ['./centres.component.css']
})
export class CentresComponent implements OnInit {

  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;
  displayData = [];

  constructor(public centreService: CentreService, public tableSvc: TableService) {
  }

  ngOnInit() {
    this.findAllCentre();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  currentPageDataChange($event: Array<{
    id: number;
    libelle: string;
    description: string;
  }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  sort(sortAttribute: any) {
    this.displayData = this.tableSvc.sort(sortAttribute, this.displayData);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      data.checked = value;
    });
    this.refreshStatus();
  }

  findAllCentre() {
    this.centreService.findAllCentre().subscribe(data => {
      this.displayData = data.content;
    });
  }

}

