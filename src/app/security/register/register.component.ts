import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    "username": new FormControl(''),
    "name": new FormControl(''),
    "email": new FormControl('', [
      Validators.email
    ]),
    "password": new FormControl('')
  })

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    document.body.classList.add("no-spacing")
  }

  ngOnDestroy() {
    document.body.classList.remove("no-spacing")
  }

  register(): void {
    if (this.form.valid) {
      const user = <User> this.form.value

      this.authenticationService.register(user).subscribe((r) => {
        console.log(r)
      })
    }
  }
}
