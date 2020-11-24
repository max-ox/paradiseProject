import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { RatingComponent } from './rating/rating.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './report/report.component';

import { FactionService } from './services/faction.service';
import { UserService } from './user/user.service';

import { AuthGuard } from "./auth/auth.guard";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeaderComponent,
    RatingComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
        { path: '', pathMatch: 'full', redirectTo: 'welcome' },
        { path: 'sign-in', component: LoginComponent },
        { path: 'sign-up', component: RegisterComponent },
        { path: 'profile/:nickname', component: ProfileComponent, canActivate: [AuthGuard]  },
        { path: 'welcome', component: HomeComponent },
        { path: 'rating', component: RatingComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'report', component: ReportComponent },
    ]),
    NgbModule
  ],
  providers: [
    FactionService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
