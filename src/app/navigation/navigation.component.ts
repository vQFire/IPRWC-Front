import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../security/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {

  }
}
