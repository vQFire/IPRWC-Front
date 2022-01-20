import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../security/authentication.service";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false
  isModerator = false
  cartSize = 0

  constructor(public authenticationService: AuthenticationService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe(() => {
      this.cartSize = this.cartService.getTotalItems()
    })

    this.authenticationService.userIsLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
      this.isModerator = !isLoggedIn ? false : this.authenticationService.isModerator()

      if (isLoggedIn) {
        this.cartService.loadCart().subscribe()
      }
    })
  }
}
