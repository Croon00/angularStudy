import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports : [CommonModule,  FormsModule, ServerComponent, ServersComponent, EditServerComponent, HomeComponent, UsersComponent, RouterModule, PageNotFoundComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
