import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_core/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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
    this.authService.signIn(formData)
  }
}

// async signIn(form, container: any): Promise<any> {
//   try {
//     const user = await this.afAuth.signInWithEmailAndPassword(form.email, form.password);
//     return user?.user?.emailVerified;
//   } catch(error) {
//     const resolver = error.resolver;

//     if (error.code == 'auth/multi-factor-auth-required') {
//       return {twoFactor: true, resolver: resolver};
//     } else {
//       return Promise.reject(error);
//     }
//   }
// }