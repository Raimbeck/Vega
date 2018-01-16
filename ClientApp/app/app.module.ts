import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { AppErrorHandler } from './app.error-handler';
import { VechileService } from './services/vechile.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserXhr, Http, HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from "ng2-toasty";
import { ChartModule } from "angular2-chartjs";
import * as Raven from 'raven-js';

import { AUTH_PROVIDERS, AuthConfig, AuthHttp } from 'angular2-jwt';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VechileFormComponent } from './components/vechile-form/vechile-form.component';
import { VechileListComponent } from './vechile-list/vechile-list.component';
import { ViewVechileComponent } from './components/view-vechile/view-vechile.component';
import { AdminComponent } from './components/admin/admin.component'
import { PhotoService } from './services/photo.service';

Raven
.config('https://cb0ff4911a324531a07a80acd48dbfde@sentry.io/250946')
.install();


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenGetter: (() => {
            var token = localStorage.getItem("access_token");
            return token !=null ? token : "";
        })
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VechileFormComponent,
        VechileListComponent,
        PaginationComponent,
        ViewVechileComponent,
        AdminComponent
    ],
    imports: [
        ToastyModule.forRoot(),
        CommonModule,
        HttpModule,
        FormsModule,
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vechiles', pathMatch: 'full' },
            { path: 'vechiles/edit/:id', component: VechileFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vechiles/new', component: VechileFormComponent, canActivate: [ AuthGuard ] },            
            { path: 'vechiles/:id', component: ViewVechileComponent },            
            { path: 'vechiles', component: VechileListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard ], data: {
                requiredRoles: ['Admin']
            } },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        AuthService,
        AuthGuard,
        VechileService,
        { provide: ErrorHandler, useClass: AppErrorHandler},
        PhotoService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ],
    exports: [
    ]
})
export class AppModuleShared {
}
