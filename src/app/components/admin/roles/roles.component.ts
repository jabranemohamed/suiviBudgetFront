import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../shared/services/role.service";
import {TableService} from "../../../shared/services/table.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;
  displayData = [];
  tableEditableRowi = 1;
  tableEditableRowEditCache = {};
  tableEditableRowDataSet = [];

  constructor(public roleService: RoleService, public tableSvc: TableService) {
  }

  ngOnInit() {
    this.findAllRole();
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
  tableEditableRowStartEdit(key: string): void {
    this.tableEditableRowEditCache[ key ].edit = true;
  }

  tableEditableRowCancelEdit(key: string): void {
    this.tableEditableRowEditCache[ key ].edit = false;
  }

  tableEditableRowSaveEdit(key: string): void {
    const index = this.displayData.findIndex(item => item.libelle === key);
    Object.assign(this.displayData[ index ], this.tableEditableRowEditCache[ key ].data);
    this.tableEditableRowEditCache[ key ].edit = false;
    this.roleService.updateRole(this.displayData[ index ]).subscribe(data => {
    });
  }
  tableEditableRowUpdateEditCache(): void {
    this.displayData.forEach(item => {
      if (!this.tableEditableRowEditCache[ item.libelle ]) {
        this.tableEditableRowEditCache[ item.libelle ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      data.checked = value;
    });
    this.refreshStatus();
  }

  findAllRole() {
    this.roleService.findAllRoles().subscribe(data => {
      this.displayData = data;
      this.tableEditableRowUpdateEditCache();
    });
  }

}
