import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, BrowserModule, HttpClientModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  answer = "";
  defaultQuestion = 'pet';
  genders = ['male', 'female']
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender:''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    //   this.signupForm.setValue({
    //     userData: {
    //       username: suggestedName,
    //       email:''
    //     },
    //     secret: 'pet',
    //     questionAnswer: '',
    //     gender: 'male'
    //   });
    // }
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }  // onSubmit(form: NgForm) {
  //   console.log(form)
  // }

  // patchValue라는 것을 통해 
  onSubmit() {
    // console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }
}
