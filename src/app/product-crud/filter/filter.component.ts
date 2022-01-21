import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  private filters: Filters = {
    name: undefined,
    min_price: undefined,
    max_price: undefined
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  productNameChanged($event: any) {
    const value = $event.target.value
    this.filters.name = value === "" ? undefined : value
    this.filters.name = value === "" ? undefined : value

    this.filterProducts()
  }

  minPriceChanged($event: any) {
    const value = $event.target.value
    this.filters.min_price = value === "" ? undefined : value

    this.filterProducts()
  }

  maxPriceChanged($event: any) {
    const value = $event.target.value
    this.filters.max_price = value === "" ? undefined : value

    this.filterProducts()
  }

  filterProducts () {
    const filters: string[] = []

    Object.keys(this.filters).forEach(key => {
      const filterKey = <keyof Filters> key

      if (this.filters[filterKey] !== undefined) {
        filters.push(`${filterKey}=${this.filters[filterKey]}`)
      }
    })

    this.productService.filterProducts(filters)
  }
}

type Filters = {
  name?: string
  min_price?: number
  max_price?: number
}
