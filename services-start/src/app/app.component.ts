import { Component, OnInit } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { CommonModule } from "@angular/common";
import { AccountsService } from './accounts.service';


@Component({
  selector: "app-root",
  standalone: true,
  imports: [AccountComponent, NewAccountComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  // providers: [AccountsService]
})
export class AppComponent implements OnInit{
  accounts: { name: string, status: string }[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }
}
