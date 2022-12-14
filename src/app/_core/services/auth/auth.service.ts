import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
// import firebase from 'firebase/app';

// type FirebaseUser = firebase.User;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private user: Observable<firebase.User>;
  private userSubject = new BehaviorSubject<any>(null);
  public currentUser = this.userSubject.asObservable();
  
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }
  
  register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password);
  }

  async signIn(form): Promise<any> {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(form.username, form.password);
      this.userSubject.next(user.user);
      // return user?.user?.emailVerified;
    } catch(error) {
      const resolver = error.resolver;

      if (error.code == 'auth/multi-factor-auth-required') {
        return {twoFactor: true, resolver: resolver};
      } else {
        return Promise.reject(error);
      }
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.userSubject.next(null);
  }

  async resetPassword(email: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await this.afAuth.sendPasswordResetEmail(email);

        resolve(res);
      } catch (err) {
        console.error('[AuthService] resetPassword', err);
        reject(err);
      }
    });
  }
}
