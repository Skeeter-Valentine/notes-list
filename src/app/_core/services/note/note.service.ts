import { Injectable } from '@angular/core';
// import { serverTimestamp } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { addDoc, updateDoc, doc, Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';
import {first} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesCollection: AngularFirestoreCollection<any>;
  notes: Observable<any[]>;
  // readonly colName: string ;
  protected collection: any;

  constructor(protected afs: AngularFirestore) {
    this.notes = this.afs.collection('notes').valueChanges();
  }

  create(data: any, id: string = null): Promise<any> {

      data.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
      data._id = this.afs.createId();

      const today = new Date();
      data.isoDate = today.toISOString().substr(0, 10);
      console.log(data._id);

      return this.collection.doc(data._id).set(data);
    // return addDoc(collection(this.firestore, this.colName), data);
  }

  // getData(identifier: string): Promise<any> {
  //   return this.notes.doc(identifier).ref.get();
  // }
  getData(){
    return this.notes;
  }
  // return this.notes.doc(identifier).ref.get();
  // https://github.com/angular/angularfire/blob/master/samples/modular/src/app/upboats/upboats.component.ts

  // delete(id: string): Promise<any> {
    //this.logger.logVerbose(`[BaseService] deleting item ${id}`);

    // const docRef = this.collection.doc<T>(id);
    // return docRef.delete();
  // }

}