import {Component, Input, OnChanges} from '@angular/core';
import {of} from "rxjs";

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

  ngOnChanges(): void {
    if (this.data.length === 0) return;

    this.keys = Object.keys(this.data[0])

    this.checkTableOptions()
  }

  checkTableOptions(): void {
    let hiddenOffset = 0

    for (const stringIndex in this.options) {
      const index = parseInt(stringIndex)
      const option = this.options[index]

      if (option.hidden) {
        this.hideColumn(index - hiddenOffset)
        hiddenOffset += 1
      }

      if (option.key) {
        this.transformObjectToKeyValue(index - hiddenOffset, option.key)
      }
    }
  }

  hideColumn(index: number) {
    this.keys.splice(index, 1)
  }

  transformObjectToKeyValue (index: number, key: string) {
    for (const [dataIndex, data] of this.data.entries()) {
      this.data[dataIndex][this.keys[index]] = data[this.keys[index]][key]
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
}

type Data = {
  [key: string]: any
}

interface Option {
  hidden?: boolean
  key?: string
}

type Options = {
  [index: number]: Option
}
