import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  standalone: true,
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna']

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),

      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com',
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      userData: {
        username: "Anna",
      },  
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get("hobbies") as FormArray).push(control);
  }

  // 💡 핵심: 안전하게 템플릿에서 접근할 수 있도록 getter 추가
  get hobbyControls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        }
        else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
