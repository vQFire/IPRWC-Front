import { Component, OnInit } from '@angular/core';
import {Purchase} from "../purchase";
import {ActivatedRoute} from "@angular/router";
import {PurchaseService} from "../purchase.service";
import {Options} from "../../components/table/tableOptions";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchase?: Purchase
  tableOptions: Options = {
    0: {
      hidden: true
    },
    1: {
      key: "name"
    },
    extraColumns: [{
      objectIndex: 1,
      objectKey: "price",
      wantedIndex: 2
    }],
    product: {
      price: 2,
      amount: 3
    },
    sumTotals: [3, 4]
  }

  constructor(private activatedRoute: ActivatedRoute,
              private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if ("id" in params) {
        this.purchaseService.getPurchase(params["id"]).subscribe(purchase => {
          this.purchase = purchase
        })
      }
    })
  }
}
