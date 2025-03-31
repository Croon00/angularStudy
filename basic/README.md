## ✅ Angular 주요 바인딩 및 템플릿 기능 총정리

| 항목 | 설명 | 문법/사용법 | 예시 | 방향성 / 목적 |
| --- | --- | --- | --- | --- |
| **Interpolation** | 데이터를 HTML에 출력 | `{{ data }}` | `<p>{{ title }}</p>` | 단방향: Component ➝ Template |
| **Property Binding** | HTML 속성에 값 바인딩 | `[property]="value"` | `<img [src]="imgUrl">` | 단방향 |
| **Event Binding** | 이벤트 발생 시 메서드 호출 | `(event)="handler()"` | `<button (click)="onClick()">Click</button>` | 단방향: Template ➝ Component |
| **Two-way Binding** | 양방향 바인딩 | `[(ngModel)]="value"` | `<input [(ngModel)]="username">` | 양방향 |
| **Local Reference** | 템플릿 요소를 변수처럼 참조 | `#ref` | `<input #myInput><button (click)="log(myInput.value)">Log</button>` | 템플릿 내 DOM 참조 |
| **@ViewChild** | 컴포넌트에서 DOM/컴포넌트 직접 접근 | `@ViewChild('ref')` | `<input #inputRef>@ViewChild('inputRef') input!: ElementRef` | 컴포넌트에서 직접 제어 |
| **ngModel** | 폼 제어 + 양방향 바인딩 | `[(ngModel)]="value"` | `<input [(ngModel)]="email">` | 폼 데이터 바인딩 |
| **Custom Event** | 자식 ➝ 부모로 이벤트 전달 | `@Output()` | `<child (notify)="onNotify()">notify = new EventEmitter()` | 자식 ➝ 부모 |
| **View Encapsulation** | 스타일 범위 지정 | `ViewEncapsulation.Emulated` | `encapsulation: ViewEncapsulation.None` 등 | 스타일 격리 |
| **Custom Directive** | 커스텀 속성 추가 | `@Directive` + `@HostListener`, `@HostBinding` | `<div appHighlight></div>` | DOM 스타일/동작 변경 |
| **ng-content** | 콘텐츠 Projection | `<ng-content>` | `<app-card><p>본문</p></app-card>` | 부모 콘텐츠 → 자식 삽입 |

---

## 📘 각 기능별 간단 예시

---

### ✅ 1. Interpolation (보간법)

```tsx
ts
복사편집
title = 'Angular';

```

```html
html
복사편집
<h1>{{ title }}</h1>

```

---

### ✅ 2. Property Binding

```tsx
ts
복사편집
imgUrl = 'logo.png';

```

```html
html
복사편집
<img [src]="imgUrl">

```

---

### ✅ 3. Event Binding

```tsx
ts
복사편집
onClick() {
  alert('Clicked!');
}

```

```html
html
복사편집
<button (click)="onClick()">Click</button>

```

---

### ✅ 4. Two-way Binding (ngModel)

```tsx
ts
복사편집
username = '';

```

```html
html
복사편집
<input [(ngModel)]="username">
<p>{{ username }}</p>

```

---

### ✅ 5. **Local Reference**

```html
html
복사편집
<input #myInput>
<button (click)="log(myInput.value)">Log</button>

```

```tsx
ts
복사편집
log(value: string) {
  console.log(value);
}

```

- ✅ DOM을 템플릿 내에서 직접 참조할 때 유용
- ❌ 컴포넌트 클래스에서는 접근 불가

---

### ✅ 6. **@ViewChild**

```html
html
복사편집
<input #inputRef>
<button (click)="focus()">Focus</button>

```

```
ts
복사편집
@ViewChild('inputRef') inputElement!: ElementRef;

focus() {
  this.inputElement.nativeElement.focus();
}

```

- ✅ 템플릿 요소를 컴포넌트에서 조작 가능
- 주로 `ngAfterViewInit` 후에 사용

---

### ✅ 7. **Custom Event Binding (자식 ➝ 부모)**

### 🔸자식 컴포넌트

```
ts
복사편집
@Output() notify = new EventEmitter<string>();

notifyParent() {
  this.notify.emit('message');
}

```

```html
html
복사편집
<button (click)="notifyParent()">Send</button>

```

### 🔸부모 컴포넌트

```html
html
복사편집
<child-component (notify)="handleNotify($event)"></child-component>

```

---

## ✅ Custom Property Binding with `@Input()` (부모 ➝ 자식)

---

### 🔸자식 컴포넌트 (ChildComponent)

```
ts
복사편집
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'child-component',
  template: `<p>📨 부모로부터 받은 메시지: {{ message }}</p>`
})
export class ChildComponent {
  @Input() message: string = '';
}

```

---

### 🔸부모 컴포넌트 (ParentComponent)

```html
html
복사편집
<!-- parent.component.html -->
<child-component [message]="'안녕하세요, 자식아!'"></child-component>

```

- `@Input()`은 **부모가 자식에게 데이터를 넘길 때 사용**
- `[]`는 **바인딩**을 의미하며, 문자열, 변수, 표현식 등 전달 가능

### ✅ 8. **View Encapsulation**

```
ts
복사편집
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.None
})

```

- `None`: 전역 스타일 적용
- `Emulated`: 기본값, 컴포넌트별 스타일 제한
- `ShadowDom`: 브라우저의 진짜 Shadow DOM 사용

---

### ✅ 9. **Custom Directive**

```
ts
복사편집
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}

```

```html
html
복사편집
<p appHighlight>강조 문장</p>

```

---

### ✅ 10. **ng-content**

### 🔸자식 컴포넌트 (Card 컴포넌트 등)

```html
html
복사편집
<div class="card">
  <ng-content></ng-content>
</div>

```

### 🔸부모 템플릿

```html
html
복사편집
<app-card>
  <h2>제목</h2>
  <p>내용을 삽입합니다.</p>
</app-card>

```

- 부모의 콘텐츠가 자식 컴포넌트 내에 삽입됨

---

## ✅ 요약 흐름도 (용도에 따라)

- **데이터 바인딩**: `{{ }}`, `[ ]`, `( )`, `[( )]`, `ngModel`
- **요소 접근**: `#ref` (템플릿에서), `@ViewChild` (컴포넌트에서)
- **컴포넌트 구조화/재사용성**: `ng-content`, 커스텀 이벤트, 커스텀 디렉티브
- **스타일 분리**: `ViewEncapsulation`

## ✅ 상황별 Angular의 데이터 처리 정리

### ✅ 1. **HTML에서 사용자 입력값을 받아서 처리할 때**

> DOM 요소를 참조해야 할 경우
> 

| 방법 | 설명 | 사용 이유 |
| --- | --- | --- |
| **로컬 참조 (`#inputRef`)** | 템플릿 내에서 직접 참조 | 간단한 값 접근, 템플릿 내에서만 사용 |
| **@ViewChild** | 컴포넌트 코드에서 직접 DOM 제어 | 값 가져오기, 포커싱, 조건 처리 등 고급 제어 |
| **`(event)` 바인딩** | 이벤트 발생 시 값 처리 | `<button (click)="save(myInput.value)">` |

---

### ✅ 2. **사용자 입력값을 그대로 바인딩하고 화면에도 실시간으로 보여주고 싶을 때**

> 양방향 바인딩 사용 = [(ngModel)]
> 

| 사용 시점 | 사용법 |
| --- | --- |
| 폼 입력, 실시간 반영, 양방향 값 처리 | `<input [(ngModel)]="username"><p>{{ username }}</p>` |
| → 컴포넌트에서도 `username` 접근 가능→ HTML에서도 실시간 반영됨 |  |
- ✅ 주의: `FormsModule`이 `AppModule`에 import되어 있어야 함

---

### ✅ 3. **백엔드(axios 등) 또는 TypeScript 코드에서 받아온 데이터를 보여줄 때**

> 컴포넌트 데이터가 핵심이고, 바인딩만 해주면 됨
> 

| 처리 흐름 | 사용 예 |
| --- | --- |
| axios/fetch로 받아온 데이터를 컴포넌트 변수에 저장 | `this.data = res.data;` |
| 보간법이나 바인딩으로 템플릿에 보여줌 | `{{ data.title }}`, `[src]="data.image"` 등 |
| `ngModel`이나 `ViewChild`는 **필요 없음** | O |

---

### ✅ 4. **컴포넌트 간 데이터 전달**

> 부모 ➝ 자식: @Input()
> 
> 
> 자식 ➝ 부모: `@Output() EventEmitter`
>


---

## ✅ 추가 Angular 디렉티브 예시

---

### ✅ 11. *ngIf 사용법

```html
<p *ngIf="isLoggedIn">환영합니다!</p>
```

- 조건이 `true`일 경우에만 요소를 보여줍니다.

---

### ✅ 12. *ngIf + else 블록 (향상된 조건 처리)

```html
<p *ngIf="isLoggedIn; else loginPrompt">로그인 되었습니다!</p>
<ng-template #loginPrompt>
  <p>로그인 해주세요.</p>
</ng-template>
```

- `*ngIf`가 false일 경우 `else`로 지정한 `<ng-template>` 블록을 보여줍니다.

---

### ✅ 13. ngStyle 사용법 (동적 스타일 지정)

```html
<p [ngStyle]="{ color: isError ? 'red' : 'green' }">상태 메시지</p>
```

- 객체 형태로 CSS 스타일을 바인딩할 수 있습니다.

---

### ✅ 14. ngClass 사용법 (동적 클래스 지정)

```html
<div [ngClass]="{ 'error': isError, 'success': !isError }">결과 메시지</div>
```

- 조건에 따라 CSS 클래스를 동적으로 적용할 수 있습니다.

---

### ✅ 15. ngForm으로 리스트 얻고 인덱스까지 사용하기

```html
<form #f="ngForm">
  <div *ngFor="let item of items; let i = index">
    <input name="item{{i}}" [(ngModel)]="items[i]">
    <span>인덱스: {{ i }}</span>
  </div>
</form>
```

- `*ngFor` 안에서 `let i = index`를 사용하면 현재 반복 요소의 인덱스를 얻을 수 있습니다.
- `ngForm`과 `ngModel`을 조합해서 각각의 폼 컨트롤을 추적할 수 있습니다.

---

---

## ✅ Angular 17+ 제어 흐름 문법 (@if, @for 등)

Angular 17부터 도입된 새로운 제어 흐름 문법을 사용하면 템플릿이 더 **직관적이고 선언적**으로 바뀝니다.

---

### ✅ 16. `@if` 문법 (기존 `*ngIf` 대체)

```html
@if (isLoggedIn) {
  <p>환영합니다!</p>
} @else {
  <p>로그인이 필요합니다.</p>
}
```

- 더 이상 `<ng-template>` 없이도 else 처리를 할 수 있습니다.
- 중첩 조건도 가독성이 좋습니다.

---

### ✅ 17. `@for` 문법 (기존 `*ngFor` 대체)

```html
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
}
```

- 더 명시적이며 `track`을 통해 성능 최적화가 쉬움
- 인덱스 사용도 가능:

```html
@for (item of items; let i = $index) {
  <li>{{ i }} - {{ item }}</li>
}
```

---

### ✅ 18. `@switch`, `@case`, `@default`

```html
@switch (status) {
  @case ('loading') {
    <p>로딩 중...</p>
  }
  @case ('success') {
    <p>성공!</p>
  }
  @default {
    <p>알 수 없음</p>
  }
}
```

---

### ✅ 19. `@defer` (지연 렌더링)

```html
@defer (when ready) {
  <p>데이터가 준비되었습니다.</p>
} @placeholder {
  <p>로딩 중입니다...</p>
}
```

- 초기 렌더링 성능을 높이기 위해 활용

---

📌 이 문법들을 사용하려면 Angular 17 이상 + `standalone` 프로젝트 또는 `enableControlFlow: true` 환경이 필요합니다.

---
