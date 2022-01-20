import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import * as jwt_decode from "jwt-decode";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  redirect = "/product"

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
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

    this.activatedRoute.queryParams.subscribe(params => {
      if ("redirect" in params) {
        this.redirect = params["redirect"]
      }
    })
  }

  ngOnDestroy() {
    document.body.classList.remove("no-spacing")
  }

  login () {
    if (this.form.valid) {
      const {username, password} = this.form.value

      this.authenticationService.login(username, password).subscribe(() => {
        this.router.navigateByUrl(this.redirect)
      })

      return;
    }

    console.warn("The login form is invalid: ");
    console.log(this.form);
  }
}
