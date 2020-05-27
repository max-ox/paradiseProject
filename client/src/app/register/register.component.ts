import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import {User} from '../models/user.model';
import {Faction} from '../models/faction.model';
import {FactionService} from '../services/faction.service';
import {RegisterService} from './register.service';
import {AuthService} from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ FactionService ]
})

export class RegisterComponent implements OnInit {
  public user: User;
  // public registraionForm: any;
  public factions: any;
  public errorMessage = '';

  constructor(
    public fb: FormBuilder,
    public factionService: FactionService,
    private registerService: RegisterService,
    public authService: AuthService,
    public router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    // this.registraionForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]]
    // })
    this.factionService.getFactions().subscribe(result => {
      if(result) {
        console.log('result', result);
        this.factions = result
      }
    })
  }

  validateRegister() {
    if(this.user.email &&
      (this.user.password === this.user.confirmPassword) &&
      this.user.password &&
      this.user.nickname &&
      this.user.contactLink &&
      this.user.faction) {
        this.authService.signUp(this.user).subscribe((res) => {
          if (res.user) {
            // this.signupForm.reset()
            this.authService.signIn(this.user);
            //.subscribe((res) => {});
            // this.router.navigate(['log-in']);
          } else {
            this.errorMessage = res.errorMessage
            // todo: show error message
          }
        })
    }

    console.log('this.user', this.user);
    // this.authService.signUp(this.user).subscribe((res) => {
    //   if (res.result) {
    //     // this.signupForm.reset()
    //     this.authService.signIn(this.user);
    //     //.subscribe((res) => {});
    //     // this.router.navigate(['log-in']);
    //   }
    // })
    // // console.log('registraionForm', this.registraionForm.status)
    // if(this.user.email && this.user.password) {
    //   this.registerService.registration(this.user).subscribe(result => {
    //     console.log('result is ', result);
    //   }, error => {
    //     console.log('error is ', error);
    //   });
    // }
    // console.log(this.user);
  }
}
