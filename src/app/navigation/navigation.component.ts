import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../security/authentication.service";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService,
              public cartService: CartService) { }

  ngOnInit(): void {

  }
}
