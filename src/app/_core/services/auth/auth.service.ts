import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      return user?.user?.emailVerified;
    } catch(error) {
      const resolver = error.resolver;

      if (error.code == 'auth/multi-factor-auth-required') {
        return {twoFactor: true, resolver: resolver};
      } else {
        return Promise.reject(error);
      }
    }
  }
}
