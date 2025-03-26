import { Component } from '@angular/core';
import { CockpitComponent } from "./cockpit/cockpit.component";
import { ServerElementsComponent } from "./server-elements/server-elements.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CockpitComponent,
    ServerElementsComponent,
  ], // ✅ Standalone 컴포넌트 등록
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  serverElements = [
    { type: "server", name: "Testserver", content: "Just a Test!" },
  ];

  constructor() {}
  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(blueprintData: {
    serverName: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: "blueprint",
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }
}
