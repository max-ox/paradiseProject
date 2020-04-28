import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: '', pathMatch: 'full', redirectTo: 'welcome' },
        { path: 'login', component: LoginComponent },
        { path: 'welcome', component: HomeComponent }
        ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
