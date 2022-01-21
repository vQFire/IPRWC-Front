import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User
  form!: FormGroup

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.profile().subscribe(user => {
      this.user = user

      this.form = new FormGroup({
        "email": new FormControl(user.email, [
          Validators.email
        ]),
        "username": new FormControl(user.username),
        "name": new FormControl(user.name),
      })
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.authenticationService.updateUser(this.form.value).subscribe(user => {
        this.user = user
      })
    }
  }
}
