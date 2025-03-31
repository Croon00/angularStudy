
# ✅ Angular 고급 바인딩 & 컴포넌트 통신 정리

---

## ✅ 1. 속성 바인딩 (Property Binding)

```html
<img [src]="imageUrl">
```

- 컴포넌트 → 템플릿으로 값을 전달
- `src`, `href`, `disabled`, `value` 등 HTML 속성에 바인딩

---

## ✅ 2. 이벤트 바인딩 (Event Binding)

```html
<button (click)="onClick()">Click Me</button>
```

- 템플릿 이벤트를 컴포넌트의 메서드와 연결
- 자주 쓰는 이벤트: `click`, `input`, `change`, `keydown`, `submit`

---

## ✅ 3. 커스텀 속성 바인딩 (`@Input()`)

```ts
@Input() title: string;
```

```html
<app-card [title]="'Angular 사용법'"></app-card>
```

- 부모 ➝ 자식 데이터 전달
- 단방향 전달 방식이며 값은 부모 컴포넌트가 제어함

---

## ✅ 4. 커스텀 속성 바인딩에 별칭 설정

```ts
@Input('customTitle') title: string;
```

```html
<app-card [customTitle]="'제목'"></app-card>
```

- 부모 템플릿에서는 `customTitle`로 사용하지만 내부 변수는 `title`

---

## ✅ 5. 커스텀 이벤트 바인딩 (`@Output()`)

```ts
@Output() clicked = new EventEmitter<string>();
```

```html
<app-card (clicked)="onCardClick($event)"></app-card>
```

- 자식 ➝ 부모 이벤트 전달
- `EventEmitter`로 데이터 전달 가능

---

## ✅ 6. 커스텀 이벤트 바인딩에 별칭 설정

```ts
@Output('aliasClick') clicked = new EventEmitter<string>();
```

```html
<app-card (aliasClick)="onCardClick($event)"></app-card>
```

- 외부에서 이벤트 이름을 다르게 지정 가능

---

## ✅ 7. 뷰 캡슐화 (View Encapsulation)

```ts
@Component({
  encapsulation: ViewEncapsulation.Emulated // 기본값
})
```

| 옵션 | 설명 |
|------|------|
| `Emulated` | 기본값. Shadow DOM 없이 스타일 캡슐화 |
| `None` | 전역 스타일처럼 적용됨 |
| `ShadowDom` | 브라우저의 Shadow DOM 사용 |

---

## ✅ 8. 템플릿에서 로컬 참조 사용

```html
<input #userInput>
<button (click)="log(userInput.value)">로그</button>
```

- `#변수명` 으로 로컬 참조를 만들고 템플릿 내에서만 접근 가능

---

## ✅ 9. ViewChild로 템플릿/DOM 접근

```html
<input #inputRef>
```

```ts
@ViewChild('inputRef') inputEl!: ElementRef;

ngAfterViewInit() {
  this.inputEl.nativeElement.focus();
}
```

- DOM 요소 또는 컴포넌트를 직접 제어 가능
- 주의: `ngAfterViewInit` 훅 이후에 접근 가능

---

## ✅ 10. ng-content (내용물 투사)

### 자식 컴포넌트

```html
<div class="box">
  <ng-content></ng-content>
</div>
```

### 부모 템플릿

```html
<app-box>
  <p>이 콘텐츠는 자식 내부로 투사됩니다.</p>
</app-box>
```

- 부모의 템플릿 내용을 자식의 특정 위치에 삽입 가능

---

## ✅ 11. ContentChild로 ng-content 내부 요소 접근

```ts
@ContentChild('projected') contentEl!: ElementRef;
```

```html
<app-box>
  <p #projected>투사된 콘텐츠</p>
</app-box>
```

- `ng-content` 내부로 투사된 요소에 자식 컴포넌트에서 접근 가능

---

## 🔄 최신 방식 또는 많이 쓰는 패턴 요약

| 목적 | 최신 방식 / 추천 패턴 |
|------|----------------------|
| DOM 접근 | `@ViewChild`, `@ContentChild` |
| 속성 전달 | `@Input()` + Optional 별칭 |
| 이벤트 전달 | `@Output()` + EventEmitter |
| 구조 분리 | `ng-content` + `@ContentChild` |
| 스타일 격리 | ViewEncapsulation (기본 Emulated) |
| 템플릿 DOM 참조 | `#templateRef` + `ViewChild` |
| 선언적 바인딩 | Angular 17+의 `@if`, `@for`, `@defer` 등 |

---


