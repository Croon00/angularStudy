// auth.guard.ts
import { CanActivateFn, CanActivateChildFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().then((authenticated) => {
    if (authenticated) {
      return true;
    } else {
      router.navigate(["/"]);
      return false;
    }
  });
};

export const authChildGuard: CanActivateChildFn = (route, state) => {
  // 자식 라우트도 동일한 가드 로직 사용
  return authGuard(route, state);
};
