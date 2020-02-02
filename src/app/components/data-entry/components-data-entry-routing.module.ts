import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatePickerComponent } from './date-picker/date-picker.component'
import { TimePickerComponent } from './time-picker/time-picker.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
    {
        path: 'data-entry',
        data: {
            title: 'Data Entry'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'date-picker',
                component: DatePickerComponent,
                data: {
                    title: 'Date Picker'
                }
            },
            {
                path: 'time-picker',
                component: TimePickerComponent,
                data: {
                    title: 'Time Picker'
                }
            },
            {
                path: 'upload',
                component: UploadComponent,
                data: {
                    title: 'Upload'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsDataEntryRoutingModule { }
