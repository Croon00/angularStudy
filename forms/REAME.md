
# ✅ Angular Forms 완전 정리 (Reactive Forms 중심)

## ✅ 1. FormBuilder vs new FormGroup 차이점

| 항목 | `new FormGroup()` 방식 | `FormBuilder` 방식 |
| --- | --- | --- |
| 선언 위치 | 수동으로 하나씩 선언 | 헬퍼 메서드로 간단하게 구성 |
| 코드 길이 | 길고 반복 많음 | 간결하고 가독성 좋음 |
| 추천도 | 작거나 단순한 폼에 적합 | ✅ 실무에서 대부분 사용함 |

### 🔸 `new FormGroup` 예시

```ts
signupForm = new FormGroup({
  userData: new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  }),
  secret: new FormControl('pet'),
  questionAnswer: new FormControl(''),
  gender: new FormControl('male')
});
```

### 🔸 `FormBuilder` 예시

```ts
constructor(private fb: FormBuilder) {}

signupForm = this.fb.group({
  userData: this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  }),
  secret: ['pet'],
  questionAnswer: [''],
  gender: ['male']
});
```

## ✅ 2. `reset()` 후 상태 초기화 전략

```ts
this.signupForm.reset();  // 초기 상태로 완전 리셋

this.signupForm.reset({
  userData: {
    username: 'defaultUser',
    email: 'default@example.com'
  },
  secret: 'pet',
  questionAnswer: '',
  gender: 'male'
});

this.signupForm.get('userData.username')?.markAsTouched();
this.signupForm.get('secret')?.disable();
```

## ✅ 3. Angular 16+ Signal 기반 Reactive Forms 구조

```ts
import { signal, effect, computed } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-signal-form',
  templateUrl: './signal-form.component.html',
  imports: [ReactiveFormsModule],
})
export class SignalFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  name = signal(this.form.get('name')!.value);
  email = signal(this.form.get('email')!.value);

  nameEffect = effect(() => {
    console.log('Name changed:', this.name());
  });

  validForm = computed(() => this.form.valid);
}
```

## ✅ `setValue()` vs `patchValue()`

```ts
this.signupForm.setValue({
  userData: {
    username: 'Max',
    email: 'max@test.com'
  },
  gender: 'male',
  hobbies: []
});

this.signupForm.patchValue({
  userData: {
    username: 'Anna'
  }
});
```

## ✅ `statusChanges`, `valueChanges`

```ts
this.signupForm.valueChanges.subscribe(value => console.log(value));
this.signupForm.statusChanges.subscribe(value => console.log(value));
```

## ✅ 커스텀 유효성 검사기

```ts
username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)])
email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
```

## ✅ 정리

| 항목 | ✔️ 잘한 점 |
| --- | --- |
| Reactive Forms 구성 | 완벽 |
| 커스텀 유효성 검사기 | 잘 적용됨 |
| set/patchValue | 정확하게 활용 |
| 상태 감시 | valueChanges, statusChanges 활용 |
| FormArray 접근 | getter 패턴 사용 |
