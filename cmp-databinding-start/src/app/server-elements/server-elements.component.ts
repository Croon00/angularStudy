import { Component, OnInit, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";  // ✅ 추가해야 *ngFor 사용 가능

@Component({
  selector: "app-server-elements",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./server-elements.component.html",
  styleUrl: "./server-elements.component.css",
})
export class ServerElementsComponent implements OnInit {
  @Input('srvElement') element: { type: string; name: string; content: string };

  constructor() {
    console.log('constructor called');
  }

  ngOnInit(): void {
    console.log('noOnInit called');
  }
}
