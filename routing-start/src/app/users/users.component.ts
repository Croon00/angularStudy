import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  standalone: true,
  imports: [CommonModule, CommonModule, UserComponent, FormsModule, RouterModule],
  styleUrls: ["./users.component.css"],
})
export class UsersComponent {
  users = [
    {
      id: 1,
      name: "Max",
    },
    {
      id: 2,
      name: "Anna",
    },
    {
      id: 3,
      name: "Chris",
    },
  ];
}
