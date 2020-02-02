import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HighlightModule } from 'ngx-highlightjs';

import { ComponentsDataEntryRoutingModule } from "./components-data-entry-routing.module";

import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        HighlightModule,
        ComponentsDataEntryRoutingModule
    ],
    exports: [],
    declarations: [
        DatePickerComponent,
        TimePickerComponent,
        UploadComponent
    ],
    providers: [],
})

export class ComponentsDataEntryModule { }
