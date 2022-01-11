import { Component, OnInit } from '@angular/core';
import {Product} from "../product";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup

  constructor(private productService: ProductService,
              private router: Router) {
    this.form = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      shortDescription: new FormControl(''),
      longDescription: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }

  submitForm (): void {
    if (this.form.valid) {
      const productForm = <Product> this.form.value
      productForm.price = parseFloat(this.form.value.price)

      this.productService.createProduct(productForm).subscribe(() => {
        this.router.navigate(['product'])
      })
    }
  }
}
