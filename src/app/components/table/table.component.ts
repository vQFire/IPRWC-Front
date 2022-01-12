import {Component, Input, OnChanges} from '@angular/core';

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

  constructor() { }

  ngOnChanges(): void {
    if (this.data.length === 0) return;

    this.keys = Object.keys(this.data[0])

    for (const index in this.options) {
      if (this.options[index].hidden) {
        this.keys.splice(parseInt(index), 1)
      }
    }
   }

  formatKey (key: string): string {
    key = key.charAt(0).toUpperCase() + key.slice(1)

    const capitalWords = key.match(/[A-Z][a-z]+/g)

    return capitalWords ? capitalWords.join(" ") : key
  }

  formatLink (data: Data) {
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
  hidden: boolean
}

type Options = {
  [index: number]: Option
}
