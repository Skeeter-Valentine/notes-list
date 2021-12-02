import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())],
})
export class CoreModule { }
