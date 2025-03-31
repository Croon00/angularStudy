## ✅ Angular 주요 바인딩 및 템플릿 기능 총정리

| 항목 | 설명 | 문법/사용법 | 예시 | 방향성 / 목적 |
| --- | --- | --- | --- | --- |
| **Interpolation** | 데이터를 HTML에 출력 | `{{ data }}` | `

 {{ title }}



` | 단방향: Component ➝ Template |
| **Property Binding** | HTML 속성에 값 바인딩 | `[property]="value"` | `
![]()
` | 단방향 |
| **Event Binding** | 이벤트 발생 시 메서드 호출 | `(event)="handler()"` | `

 Click

` | 단방향: Template ➝ Component |
| **Two-way Binding** | 양방향 바인딩 | `[(ngModel)]="value"` | `

` | 양방향 |
| **Local Reference** | 템플릿 요소를 변수처럼 참조 | `#ref` | `


 Log

` | 템플릿 내 DOM 참조 |
| **@ViewChild** | 컴포넌트에서 DOM/컴포넌트 직접 접근 | `@ViewChild('ref')` | `

@ViewChild('inputRef') input!: ElementRef` | 컴포넌트에서 직접 제어 |
| **ngModel** | 폼 제어 + 양방향 바인딩 | `[(ngModel)]="value"` | `

` | 폼 데이터 바인딩 |
| **Custom Event** | 자식 ➝ 부모로 이벤트 전달 | `@Output()` | `

 notify = new EventEmitter()` | 자식 ➝ 부모 |
| **View Encapsulation** | 스타일 범위 지정 | `ViewEncapsulation.Emulated` | `encapsulation: ViewEncapsulation.None` 등 | 스타일 격리 |
| **Custom Directive** | 커스텀 속성 추가 | `@Directive` + `@HostListener`, `@HostBinding` | `
 

 ` | DOM 스타일/동작 변경 |
| **ng-content** | 콘텐츠 Projection | `
 
 ` | `
 

 본문
 



 ` | 부모 콘텐츠 → 자식 삽입 |

...
 


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
