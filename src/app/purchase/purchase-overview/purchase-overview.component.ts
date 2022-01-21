import { Component, OnInit } from '@angular/core';
import {Purchase} from "../purchase";
import {PurchaseService} from "../purchase.service";
import {Options} from "../../components/table/tableOptions";

@Component({
  selector: 'app-purchase-overview',
  templateUrl: './purchase-overview.component.html',
  styleUrls: ['./purchase-overview.component.scss']
})
export class PurchaseOverviewComponent implements OnInit {
  purchases: Purchase[] = []
  tableOptions: Options = {
    0: {
      hidden: true
    },
    1: {
      key: "name"
    },
    2: {
      hidden: true
    }
  }

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getAllPurchases().subscribe(purchases => {
      this.purchases = purchases
    })
  }
}
