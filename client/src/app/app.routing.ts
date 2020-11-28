import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { RatingComponent } from './rating/rating.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './report/report.component';


import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'profile/:nickname', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'welcome', component: HomeComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
