import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../security/authentication.service";
import {Role} from "../../security/role";
import {FormControl, FormGroup} from "@angular/forms";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  isModerator: boolean;
  form: FormGroup | null = null

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              public cartService: CartService,
              private router: Router) {
    this.isModerator = authenticationService.isGranted(Role.ROLE_MODERATOR)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["name"]) {
        this.productService.getProduct(params["name"]).subscribe(product => {
          this.product = product

          if (this.isModerator) {
            this.form = new FormGroup({
              id: new FormControl(product.id),
              name: new FormControl(product.name),
              price: new FormControl(product.price),
              shortDescription: new FormControl(product.shortDescription),
              longDescription: new FormControl(product.longDescription),
              sale: new FormControl(product.sale)
            })
          }
        })
      }
    })
  }

  submitForm (): void {
    if (this.isModerator && this.product && this.form && this.form.valid) {
      console.log(this.form.value)

      const productForm = <Product> this.form.value
      productForm.price = parseFloat(this.form.value.price)

      this.productService.updateProduct(productForm).subscribe(() => {
        this.router.navigate(['admin', 'product'])
      })
    }
  }

  deleteProduct (): void {
    if (this.isModerator && this.product) {
      const confirmDelete = confirm(`You are going to delete ${this.product.name}, are you sure?`)

      if (confirmDelete) {
        this.productService.deleteProduct(this.product.name).subscribe(() => {
          this.router.navigate(['admin', 'product'], {
            replaceUrl: true
          })
        })
      }
    }
  }
}
