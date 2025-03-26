import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" }) // 👈 이게 핵심!
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
