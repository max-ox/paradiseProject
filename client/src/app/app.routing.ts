import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RatingComponent } from './rating/rating.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'profile/:nickname', component: ProfileComponent },
  { path: 'welcome', component: HomeComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '404' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
