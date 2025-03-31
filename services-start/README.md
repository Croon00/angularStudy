
# ✅ Angular Service + Subject 패턴 완벽 정리

Angular에서 서비스는 단순 기능 분리뿐 아니라, **RxJS의 Subject를 이용한 상태 관리**까지도 자주 활용됩니다.

---

## ✅ 왜 Subject를 사용하나요?

- 서비스 내에서 데이터 변경을 감지하고 컴포넌트에 **알림(push)** 할 수 있음
- 여러 컴포넌트가 같은 서비스의 Subject를 **구독하여 자동으로 반응**
- 대표적으로 `.next()`로 변경을 발행하고 `.subscribe()`로 반응함

---

## ✅ 서비스 구조 예제

### 📁 item.model.ts

```ts
export interface Item {
  id: number;
  name: string;
}
```

---

### 📁 item.service.ts

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private items: Item[] = [];

  // 변경사항 알림을 위한 Subject
  private itemsChanged = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsChanged.asObservable();

  getItems(): Item[] {
    return [...this.items];
  }

  getItem(id: number): Item | undefined {
    return this.items.find(i => i.id === id);
  }

  addItem(item: Item) {
    this.items.push(item);
    this.itemsChanged.next(this.getItems());
  }

  updateItem(id: number, updated: Item) {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items[index] = updated;
      this.itemsChanged.next(this.getItems());
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.itemsChanged.next(this.getItems());
  }
}
```

---

## ✅ 컴포넌트에서 사용하는 방법

### 📁 item-list.component.ts

```ts
@Component({
  selector: 'app-item-list',
  template: `
    <ul>
      <li *ngFor="let item of items">{{ item.name }}</li>
    </ul>
  `
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private sub!: Subscription;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    // subscribe로 변경 사항 감지
    this.sub = this.itemService.items$.subscribe(data => {
      this.items = data;
    });

    // 초기 데이터 수동 설정 (필요시)
    this.items = this.itemService.getItems();
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); // 메모리 누수 방지
  }
}
```

---

## ✅ 패턴 요약

| 메서드 | 설명 |
|--------|------|
| `addItem()` | 새 항목 추가 후 Subject로 목록 갱신 발행 |
| `updateItem()` | 항목 업데이트 후 알림 |
| `deleteItem()` | 삭제 후 최신 목록 발행 |
| `getItems()` | 목록 복사 반환 (불변성 유지) |
| `items$` | 외부에서 subscribe 가능한 Observable 스트림 |

---

## 📘 핵심 포인트

- `BehaviorSubject`는 항상 마지막 값을 기억하고 새 구독자에게도 바로 emit
- `.next()`로 상태를 변경하고, 구독자는 자동으로 업데이트됨
- Angular에서는 이 패턴이 **가볍고 강력한 상태 관리 수단**으로 널리 사용됨

---

## ✅ 추천 활용 사례

- 쇼핑카트
- 로그인 상태
- 알림 리스트
- 필터 조건
- 페이지간 공유된 리스트

---

> 🚀 상태가 바뀌면 자동으로 반영되도록 만들고 싶다면, 서비스 + `Subject` 패턴은 매우 강력한 선택입니다!







# ✅ Angular Service + BehaviorSubject + Subscribe 패턴 정리

---

## ✅ subscribe & unsubscribe 패턴 추가 설명

```ts
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.itemService.items$.subscribe(data => {
      this.items = data; // 상태 반영
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); // ✅ 메모리 누수 방지 필수!
  }
}
```

> ✅ Angular 컴포넌트에서 `subscribe()`를 사용할 경우에는 반드시 `unsubscribe()`도 해줘야 합니다.  
> ➕ 그렇지 않으면 **메모리 누수(leak)** 또는 **구독 중복** 문제가 발생할 수 있어요.

---

## ✅ BehaviorSubject vs Subject 차이 및 Changed 용도

| 항목 | BehaviorSubject | Subject |
|------|-----------------|---------|
| 초기값 | ✅ 있음 | ❌ 없음 |
| 최근값 유지 | ✅ 유지 | ❌ 유지 안됨 |
| 새 구독자 | 최근값 즉시 전달 | 아무것도 안 보냄 |
| 상태 관리에 적합 | ✅ 매우 적합 | ❌ 일회성 이벤트에 적합 |

---

### ✅ 그래서 `itemsChanged = new Subject<Item[]>();` 쓰면?

```ts
// 기존 방식 (예전 튜토리얼 등에서 자주 보임)
itemsChanged = new Subject<Item[]>();

addItem(item: Item) {
  this.items.push(item);
  this.itemsChanged.next(this.getItems());
}
```

- `Subject`는 처음 구독했을 때 값을 **못 받습니다**.
- 따라서 **초기 상태를 가지고 있어야 하는 경우엔 적절하지 않음**

---

## ✅ 요즘에는 어떤 걸 쓰나?

| 목적 | 많이 쓰는 것 |
|------|---------------|
| 상태 보존 + 변화 감지 | ✅ `BehaviorSubject` |
| 값 기억 필요 없음, 단발 이벤트 (예: 클릭, 알림) | `Subject` |
| 비동기 흐름 조합, 응답 처리 | `Observable + RxJS 연산자` |
| 템플릿에서 쓰기 | ✅ `async pipe` |

---

## ✅ 예시: BehaviorSubject로 상태 공유 + async pipe

### 📁 서비스

```ts
private items = new BehaviorSubject<Item[]>([]);
items$ = this.items.asObservable();

addItem(item: Item) {
  this.items.next([...this.items.value, item]);
}
```

---

### 📁 컴포넌트

```html
<ul>
  <li *ngFor="let item of itemService.items$ | async">
    {{ item.name }}
  </li>
</ul>
```

- ✅ `async pipe`를 사용하면 `subscribe()` & `unsubscribe()`가 자동으로 관리돼요!
- ts 컴포넌트에서 사용할 필요 없이 바로 템플릿에서 사용
- 👉 **가장 추천되는 최신 방식**

---

## ✅ 결론 요약

| 항목 | 설명 |
|------|------|
| `BehaviorSubject` | ✅ 초기값 + 최근값 보존 + 구독 즉시 emit |
| `Subject` | ❌ 상태 공유에는 부적합 (이벤트 용도에 적합) |
| `subscribe()` | 수동으로 쓸 경우 `unsubscribe()` 필수 |
| `async pipe` | 가장 안전하고 요즘 많이 쓰는 방법 ✅ |



## ✅ 전통 방식: get() 메서드 제공
```ts
복사
편집
// 서비스
getItems(): Item[] {
  return [...this.items]; // 복사해서 반환
}
```

---


### 컴포넌트

``` ts
    items = this.itemService.getItems(); 
```

## ❌ 한계
- 상태 변경 알림이 안 됨

- 매번 수동으로 새로고침해야 함

- 리액티브하지 않음

## ✅ 최신 방식: BehaviorSubject or signal 공개 + 템플릿에서 async pipe
```ts
복사
편집
// 서비스
private itemsSubject = new BehaviorSubject<Item[]>([]);
items$ = this.itemsSubject.asObservable();

// 템플릿
<ul>
  <li *ngFor="let item of itemService.items$ | async">{{ item.name }}</li>
</ul>
```

## ✅ 장점
- 자동 업데이트 됨

- subscribe() / unsubscribe() 안 해도 됨 (템플릿에선 async pipe가 처리)

- 재사용성이 좋고 테스트도 편함

## ✅ 결론 요약
-- 비교 항목	전통 방식 (get())	최신 방식 (BehaviorSubject + async)
-- 리액티브	❌ 아님	✅ 반응형
-- 상태 추적	직접 호출해야 함	자동으로 변경 감지
-- 메모리 관리	신경 쓸 필요 없음	async pipe 덕분에 자동 관리
-- 추천 여부	❌ 지양 (간단할 때만)	✅ Angular 공식 추천 패턴
-- 📌 그래서 최근 Angular 서비스 구조에서는 다음 3가지를 기준으로 합니다:

```ts
복사
편집
@Injectable({ providedIn: 'root' })
export class MyService {
  private state = new BehaviorSubject<T[]>([]);
  readonly state$ = this.state.asObservable();

  add(item: T) {
    this.state.next([...this.state.value, item]);
  }
}
```

- 템플릿에서는 state$ | async로 바인딩.
- 컴포넌트에서 꼭 직접 써야 할 땐 .subscribe() 또는 firstValueFrom().




