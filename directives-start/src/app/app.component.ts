// ✅ 2. app.component.ts (Standalone Component)
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BasicHighlightDirective } from "./basic-highlight/basic-highlight.directive";
import { BetterHighlightDirective } from "./better-highlight/better-highlight.directive";
import { UnlessDirective } from "./better-highlight/unless.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
  value = 5;
  title = "app works!";
}
