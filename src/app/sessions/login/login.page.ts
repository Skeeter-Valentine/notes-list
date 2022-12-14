import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../_core/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public auth: AngularFireAuth
  ) {
    this.postForm = this.formBuilder.group({
  		username: ['', Validators.required],
  		password: ['', Validators.required],
    });
  }

  submit(){
    const formData = this.postForm.getRawValue();
    console.log(formData);
    this.authService.register(formData.username, formData.password);
  }

  loginOptions() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginPassword(){
    const formData = this.postForm.getRawValue();
    console.log(formData);
    this.authService.signIn(formData);
  }

  logOut(){
    this.authService.signOut();
  }

  resetPassword(){
    const formData = this.postForm.getRawValue();
    this.authService.resetPassword(formData.username);
    console.log('sending');
  }
}
