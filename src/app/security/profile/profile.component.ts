import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User
  form!: FormGroup
  private isOwnProfile = true

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if ("name" in params) {
        this.authenticationService.getUser(params["name"]).subscribe(user => {
          this.createForm(user)
          this.isOwnProfile = false
        })
      } else {
        this.authenticationService.profile().subscribe(user => {
          this.createForm(user)
        })
      }
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.authenticationService.updateUser(this.form.value, this.user.username, this.isOwnProfile).subscribe(user => {
        this.user = user
      })
    }
  }

  createForm (user: User) {
    this.user = user

    this.form = new FormGroup({
      "email": new FormControl(user.email, [
        Validators.email
      ]),
      "name": new FormControl(user.name),
    })
  }
}
