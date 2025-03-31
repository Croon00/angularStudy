
# 📘 Angular Routing 완벽 가이드 (Standalone 포함)

## ✅ 1. 기본 라우팅 구성 (Angular 15+ Standalone)

### 🔹 UsersComponent 생성

```ts
// src/app/users.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `<h2>Users 페이지입니다!</h2>`,
})
export class UsersComponent {}
```

### 🔹 app.config.ts 라우팅 등록

```ts
// src/app/app.config.ts
import { provideRouter, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];

export const appConfig = [provideRouter(routes)];
```

### 🔹 main.ts 등록

```ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [...appConfig]
});
```

### 🔹 app.component.ts에 router-outlet 추가

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/users" routerLinkActive="active">Users</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
```

---

## ✅ routerLink vs [routerLink] 차이

| 문법 | 설명 |
|------|------|
| `routerLink="/users"` | 고정 문자열 경로 |
| `[routerLink]="['/users']"` | 바인딩된 경로 (추천 방식) |
| `[routerLink]="['/users', user.id]"` | 동적 파라미터 포함 경로 |

---

## ✅ router.navigate()

```ts
constructor(private router: Router) {}

goToUser(id: number) {
  this.router.navigate(['/users', id]);
}
```

---

## ✅ queryParams & fragment

```ts
this.router.navigate(
  ['/users', 3],
  {
    queryParams: { mode: 'edit' },
    fragment: 'top'
  }
);
// 결과: /users/3?mode=edit#top
```

HTML에서:

```html
<a [routerLink]="['/users', 3]" [queryParams]="{ mode: 'edit' }" fragment="top">
  Go to User 3 Edit
</a>
```

---

## ✅ queryParamsHandling: 'preserve'

```ts
this.router.navigate(['edit'], {
  relativeTo: this.route,
  queryParamsHandling: 'preserve'
});
```

```html
<a [routerLink]="['edit']" [queryParamsHandling]="'preserve'">Edit</a>
```

---

## ✅ routerLinkActive

```html
<a routerLink="/users" routerLinkActive="active">Users</a>
```

- 해당 경로일 경우 클래스(active)가 적용됨

---

## ✅ snapshot vs subscribe

| 구분 | snapshot | subscribe |
|------|----------|-----------|
| 시점 | 최초 1회 | 변경 시마다 |
| 사용 예 | 고정 경로 | 동적 파라미터 |
| 장점 | 간단 | 반응형 |
| 단점 | 변경 감지 불가 | unsubscribe 필요 |

```ts
// snapshot
const id = +this.route.snapshot.paramMap.get('id')!;

// subscribe
this.route.params.subscribe(params => {
  this.id = +params['id'];
});
```

---

## ✅ children 라우팅

```ts
// routes
{
  path: 'users',
  component: UsersComponent,
  children: [
    { path: ':id', component: UserDetailComponent }
  ]
}
```

UsersComponent 템플릿:

```html
<router-outlet></router-outlet>
```

---

## ✅ 요약

| 기능 | 문법 |
|------|------|
| 기본 경로 리디렉션 | `redirectTo`, `pathMatch: 'full'` |
| router outlet | `<router-outlet></router-outlet>` |
| 라우팅 이동 | `[routerLink]`, `router.navigate()` |
| 파라미터 | `params`, `snapshot`, `:id` |
| 쿼리/해시 | `queryParams`, `fragment` |
| 상태 유지 | `queryParamsHandling: 'preserve'` |
| 액티브 클래스 | `routerLinkActive` |
