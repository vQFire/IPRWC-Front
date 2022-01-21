import {Component, Input, OnChanges} from '@angular/core';
import {Data, Options} from "./tableOptions";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input("data") data: Data[] = [];
  @Input("route") route: string = "";
  @Input("options") options: Options = {}
  keys: string[] = [];
  original_keys: string[] = [];
  totals: number[] = []

  ngOnChanges(): void {
    if (this.data.length === 0) return;

    this.keys = Object.keys(this.data[0])

    this.checkTableOptions()
  }

  checkTableOptions(): void {
    if (this.options.extraColumns) {
      this.createExtraColumn()
    }

    if (this.options.product) {
      this.calculateProductSum()
    }

    if (this.options.sumTotals) {
      for (const data of this.data) {
        for (const [index, sumTotal] of this.options.sumTotals.entries()) {
          this.totals[index] === undefined ? this.totals[index] = 0 : null

          this.totals[index] += data[this.keys[sumTotal]]

          this.totals[index].toFixed(2)
        }
      }
    }


    this.original_keys = this.keys.slice()

    for (const stringIndex in this.options) {
      if (isNaN(Number(stringIndex))) continue

      const index = parseInt(stringIndex)
      const option = this.options[index]

      if (option.hidden) {
        this.hideColumn(index)
      }

      if (option.key) {
        this.transformObjectToKeyValue(index, option.key)
      }
    }
  }

  hideColumn(index: number) {
    const diff = this.original_keys.length - this.keys.length

    this.keys.splice(index - diff, 1)
  }

  transformObjectToKeyValue (index: number, key: string) {
    for (const [dataIndex, data] of this.data.entries()) {
      this.data[dataIndex][this.original_keys[index]] = data[this.original_keys[index]][key]
    }
  }

  formatKey(key: string): string {
    key = key.charAt(0).toUpperCase() + key.slice(1)

    const capitalWords = key.match(/[A-Z][a-z]+/g)

    return capitalWords ? capitalWords.join(" ") : key
  }

  formatLink(data: Data) {
    const keys = this.route.match(/(?<={)(.*?)(?=})/g)

    if (!keys) {
      console.error("Er is geen key gevonden met route:", this.route)
      return;
    }
    if (keys && keys.length > 1) {
      console.warn("Er is mogelijk iets verkeerd aan de opgegeven 'route', er zijn meerdere keys gevonden", keys)
      return;
    }

    const key = keys[0]
    return this.route.replace(/{[\w]+}/g, data[key])
  }

  calculateProductSum () {
    if (!this.options.product) return;

    const priceIndex = this.options.product.price
    const amountIndex = this.options.product.amount

    this.keys.push("total")

    for (const [dataIndex, data] of this.data.entries()) {
      const price = data[this.keys[priceIndex]]
      const amount = data[this.keys[amountIndex]]

      this.data[dataIndex]["total"] = price * amount
    }
  }

  createExtraColumn () {
    if (!this.options.extraColumns?.length) return;

    for (const extraColumn of this.options.extraColumns) {
      for (const [dataIndex, data] of this.data.entries()) {
        const newValue = data[this.keys[extraColumn.objectIndex]][extraColumn.objectKey]

        this.data[dataIndex][extraColumn.objectKey] = newValue
      }

      this.keys.splice(extraColumn.wantedIndex, 0, extraColumn.objectKey)
    }
  }
}
