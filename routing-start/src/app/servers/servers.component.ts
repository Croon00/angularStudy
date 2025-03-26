import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { FormsModule } from '@angular/forms';
import { ServerComponent } from './server/server.component';
import { EditServerComponent } from './edit-server/edit-server.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  imports: [
    CommonModule,
    ServerComponent,
    EditServerComponent,
    RouterModule,
    FormsModule,
  ],
  standalone: true,
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    this.router.navigate(['servers'], {relativeTo: this.route})
  }
}
