import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {AuthenticationService} from "../authentication.service";
import {Options} from "../../components/table/tableOptions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  users!: User[]
  tableOptions: Options = {
    4: {
      hidden: true,
    },
    5: {
      hidden: true
    }
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getUsers().subscribe(users => {
      this.users = users
    })
  }
}
