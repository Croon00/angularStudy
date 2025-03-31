
# 📘 Angular + RxJS 완전 정복 가이드

이 문서는 Angular에서 RxJS의 핵심 개념 및 실전 적용 방식, 그리고 최신 Signal 기반 대체 방식까지 정리한 가이드입니다.

---

## ✅ 1. Observable이란?

- **비동기 데이터 스트림**을 다룰 수 있는 객체
- 예: HTTP 요청, 폼 값, 이벤트 등

```ts
import { Observable } from 'rxjs';

const obs$ = new Observable(observer => {
  observer.next('📦 데이터 1');
  observer.next('📦 데이터 2');
  observer.complete(); // ✅ 완료
});
```

---

## ✅ 2. 옵저버(Observer)란?

- Observable이 방출한 값을 **구독(subscribe)**해서 받는 객체

```ts
obs$.subscribe({
  next: data => console.log('데이터 수신:', data),
  complete: () => console.log('완료됨 ✅'),
  error: err => console.error('오류 💥', err)
});
```

---

## ✅ 3. Angular에서 Observable 사용 예

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe(params => {
    console.log(params['id']);
  });
}
```

---

## ✅ 4. 클로저와 Angular Core 연관

```ts
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const inc = outer();
console.log(inc()); // 1
console.log(inc()); // 2
```

Angular 내부의 `subscribe`, `inject`, `effect` 등의 동작은 **클로저로 상태를 유지**하는 방식과 유사함

---

## ✅ 5. 커스텀 Observable 만들기

```ts
import { Observable } from 'rxjs';

const custom$ = new Observable<string>(observer => {
  setTimeout(() => observer.next('🔥 커스텀 데이터'), 1000);
  setTimeout(() => observer.complete(), 1500);
});
```

---

## ✅ 6. 오류(error) 및 완료(complete) 처리

```ts
custom$.subscribe({
  next: val => console.log(val),
  error: err => console.error(err),
  complete: () => console.log('✅ 완료!')
});
```

---

## ✅ 7. 주요 연산자(Operators)

| 연산자 | 설명 |
|--------|------|
| `map()` | 데이터 가공 |
| `filter()` | 조건 필터링 |
| `tap()` | 중간 디버깅 |
| `switchMap()` | 내부 옵저버블로 전환 (ex: http 요청) |
| `takeUntil()` | 특정 조건에서 자동 unsubscribe |

---

## ✅ 8. Subject / BehaviorSubject / ReplaySubject

| 항목 | Subject | BehaviorSubject | ReplaySubject |
|------|---------|-----------------|---------------|
| 초기값 | ❌ 없음 | ✅ 있음 | ✅ 있음 |
| 최신값 기억 | ❌ X | ✅ O | ✅ O (여러 개) |
| 새 구독자 | 아무것도 안줌 | 최신값 emit | 최근 N개 emit |
| 상태관리용 | ❌ 부적합 | ✅ 적합 | ✅ 로그/히스토리용 |

---

## ✅ 9. Angular에서 BehaviorSubject + async pipe 사용

### 📦 서비스

```ts
private user$ = new BehaviorSubject<User | null>(null);
get userObservable$() {
  return this.user$.asObservable();
}
```

### 📦 컴포넌트 템플릿

```html
<div *ngIf="userService.userObservable$ | async as user">
  <p>{{ user.name }}</p>
</div>
```

✅ 자동으로 subscribe / unsubscribe 관리됨

---

## ✅ 10. Signal로 대체 (Angular 17+)

```ts
import { signal } from '@angular/core';

export class UserService {
  user = signal<User | null>(null);

  setUser(newUser: User) {
    this.user.set(newUser);
  }
}
```

### 컴포넌트에서 사용

```html
<div *ngIf="userService.user() as user">
  <p>{{ user.name }}</p>
</div>
```

---

## ✅ 결론 요약

| 방식 | 설명 | 추천 상황 |
|------|------|-----------|
| Observable | 스트림 처리 전통 방식 | HTTP, 이벤트 등 |
| Subject | 여러 구독자에게 이벤트 | 일회성 알림 |
| BehaviorSubject | 상태 공유 + 최신값 | 로그인, 상태 관리 |
| async pipe | 자동 관리 | 템플릿에서 사용시 |
| Signal | 최신 Angular 방식 | 컴포넌트 간 상태관리 |

---

> 📌 RxJS는 Angular에서 가장 핵심적인 개념이며, Signal은 이를 대체하거나 보완하는 최신 패러다임입니다.
