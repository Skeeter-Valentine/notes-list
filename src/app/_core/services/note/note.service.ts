import { Injectable } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, updateDoc, doc, Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';
import {first} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;
  noteDoc: AngularFirestoreDocument<Note>;
  // readonly colName: string ;
  protected collection: any;

  constructor(protected afs: AngularFirestore) {
    this.notes = this.afs.collection('notes').valueChanges();
    this.collection = this.afs.collection('notes');
    
    // snapshotChanges().map(changes => {
    //   changes.map(a => {
    //     const data = a.payload.doc.data();
    //   });
    // });
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

  delete(note: Note) {
    this.noteDoc = this.afs.doc(`notes/${note._id}`);
    this.noteDoc.delete();
    // this.logger.logVerbose(`[BaseService] deleting item ${id}`);

    // const docRef = this.collection.doc<T>(id);
    // return docRef.delete();
  }

}