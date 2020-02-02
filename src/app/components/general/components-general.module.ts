import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../shared/shared.module';

import { ComponentsGeneralRoutingModule } from "./components-general-rounting.module";

import { ButtonsComponent } from "./buttons/buttons.component";
import { IconsComponent } from './icons/icons.component';
import { IconFilterPipe } from 'src/app/shared/pipes/iconFilter.pipe';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ComponentsGeneralRoutingModule
    ],
    exports: [],
    declarations: [
        ButtonsComponent,
        IconsComponent,
        IconFilterPipe
    ],
    providers: [
        IconFilterPipe
    ],
})
export class ComponentsGeneralModule { }
