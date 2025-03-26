import { Component, Output } from '@angular/core';
import { LogginService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  standalone: true,
  styleUrls: ["./new-account.component.css"],
  // providers: [LogginService]
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  constructor(private logginService: LogginService,
              private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdate.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }
  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus,
    // });
    this.accountsService.addAccount(accountName, accountStatus);

    // this.logginService.logStatusChange(accountStatus);
    // const service = new LogginService();
    // service.logStatusChange(accountStatus);
  }
}
