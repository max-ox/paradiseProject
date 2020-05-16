import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import {User} from '../models/user.model';
import {Faction} from '../models/faction.model';
import {FactionService} from '../services/faction.service';
import {RegisterService} from './register.service';

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

  constructor(public fb: FormBuilder,
              public factionService: FactionService,
              private registerService: RegisterService) {
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
    // console.log('registraionForm', this.registraionForm.status)
    if(this.user.email && this.user.password) {
      this.registerService.registration(this.user).subscribe(result => {
        console.log('result is ', result);
      }, error => {
        console.log('error is ', error);
      });
    }
    console.log(this.user);
  }
}
