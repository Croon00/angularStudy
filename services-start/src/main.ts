import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // 여기에 필요한 provider들 추가 가능
    // 예: provideHttpClient(), provideAnimations(), etc.
  ],
}).catch((err) => console.error(err));
