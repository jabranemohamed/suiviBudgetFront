import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../shared/shared.module';
import { HighlightModule } from 'ngx-highlightjs';

import { ComponentsNavigationRoutingModule } from "./components-navigation-rounting.module";

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component'
import { dropdownComponent } from './dropdown/dropdown.component'
import { menuComponent } from './menu/menu.component'
import { pageHeaderComponent } from './page-header/page-header.component';
import { paginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HighlightModule,
        ComponentsNavigationRoutingModule
    ],
    exports: [],
    declarations: [
        BreadcrumbComponent,
        dropdownComponent,
        menuComponent,
        pageHeaderComponent,
        paginationComponent
    ],
    providers: [],
})
export class ComponentsNavigationModule { }
