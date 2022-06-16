import { Injectable } from '@angular/core';
// import { serverTimestamp } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { addDoc, updateDoc, doc, Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';
import {first} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  items: Promise<any[]>;
  readonly colName: string ;
  protected collection: any;

  constructor(
    protected afs: AngularFirestore) {
    this.collection = this.afs.collection('notes');
  }

  create(data: any, id: string = null): Promise<any> {
    // const promise = new Promise<any>((resolve, reject) =>
    //   {if (!id) {id = this.afs.createId();

      data.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
      data._id = this.afs.createId();

      const today = new Date();
      data.isoDate = today.toISOString().substr(0, 10);
      console.log(data._id);

    //   this.collection.doc(id).set(data).then(ref => {
    //     resolve(data);
    //   }, err => {
    //     "error";
    //     //this.logger.logError(err);
    //     reject(err);
    //   });
    // });
      return this.collection.doc(data._id).set(data);
    // return addDoc(collection(this.firestore, this.colName), data);
  }

  getData(identifier: string): Promise<any> {
  //   this.logger.logVerbose(`[BaseService] getPromise: ${identifier}`);

  //   return this.collection(this.firestore, identifier);
  // }

  // getData(identifier: string): Promise<any> {
  //   return collectionData(collection(this.firestore, identifier)).pipe(first()).toPromise();
  //   new Promise((resolve, reject) => {
  //     this.get(identifier).then(docs => {
  //       if (docs.exists){
  //         resolve(docs.data());
  //       }
  //       else {
  //         resolve(null);
  //       }
  //     }, err => {
  //     });
  //   });
    return this.collection.doc(identifier).ref.get();
  }
  // https://github.com/angular/angularfire/blob/master/samples/modular/src/app/upboats/upboats.component.ts

  // delete(id: string): Promise<any> {
    //this.logger.logVerbose(`[BaseService] deleting item ${id}`);

    // const docRef = this.collection.doc<T>(id);
    // return docRef.delete();
  // }

}