import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.form = this.formBuilder.group({
      username: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
    });
  }

  ngOnInit() {
    document.body.classList.add("no-spacing")
  }

  ngOnDestroy() {
    document.body.classList.remove("no-spacing")
  }

  login () {
    if (this.form.valid) {
      const {username, password} = this.form.value

      this.authenticationService.login(username, password).subscribe((result) => {
        console.log(jwt_decode.default(result.access_token))
      })

      return;
    }

    console.warn("The login form is invalid: ");
    console.log(this.form);
  }
}
