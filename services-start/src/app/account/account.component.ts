import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogginService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  imports: [CommonModule],
  standalone: true,
  styleUrls: ["./account.component.css"],
  // providers: [LogginService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{
  //   id: number;
  //   newStatus: string;
  // }>();

  constructor(private logginService: LogginService,
              private accountsService: AccountsService
  ) {}

  onSetTo(status: string) {
    // this.statusChanged.emit({ id: this.id, newStatus: status });
    this.accountsService.updateStatus(this.id, status);
    // this.logginService.logStatusChange(status)
    this.accountsService.statusUpdate.emit(status);
  }
}
