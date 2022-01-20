import { Component, OnInit } from '@angular/core';
import {Purchase} from "../purchase";
import {ActivatedRoute} from "@angular/router";
import {PurchaseService} from "../purchase.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchase?: Purchase
  tableOptions = {
    0: {
      hidden: true
    },
    1: {
      key: "name"
    }
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
