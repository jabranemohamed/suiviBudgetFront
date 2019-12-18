import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { RolesComponent } from './components/admin/roles/roles.component';
import { UtilisateursComponent } from './components/admin/utilisateurs/utilisateurs.component';
import { CentresComponent } from './components/admin/centres/centres.component';
import { BudgetsComponent } from './components/admin/budgets/budgets.component';
import { FilesUploadComponent } from './components/admin/files-upload/files-upload.component';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent,
        RolesComponent,
        UtilisateursComponent,
        CentresComponent,
        BudgetsComponent,
        FilesUploadComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        AppRoutingModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule
    ],
    providers: [
        { 
            provide: NZ_I18N,
            useValue: en_US, 
        },
        ThemeConstantService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
