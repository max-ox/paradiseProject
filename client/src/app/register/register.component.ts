import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import {User} from '../models/user.model';
import {Faction} from '../models/faction.model';
import {FactionService} from '../services/faction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ FactionService ]
})

export class RegisterComponent implements OnInit {
  public user: User;
  oppoSuits: any = ['Men', 'Women', 'Boys', 'Inspiration']

  constructor(public fb: FormBuilder, public factionService: FactionService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.factionService.getFactions().subscribe(result => {
      console.log('result', result);
    })
  }

  validateRegister() {
  }

  oppoSuitsForm = this.fb.group({
    name: ['']
  })

  onSubmit() {
    alert(JSON.stringify(this.oppoSuitsForm.value))
  }

}
