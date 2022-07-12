import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Observable<Note[]>;
  noteDoc: AngularFirestoreDocument<Note>;
  protected collection: any;

  constructor(protected afs: AngularFirestore) {
    this.notes = this.afs.collection('notes').valueChanges();
    this.collection = this.afs.collection('notes');
  }


  create(data: any, id: string = null): Promise<any> {

      data._id = this.afs.createId();

      return this.collection.doc(data._id).set(data);
  }

  getData(){
    return this.notes;
  }


  delete(note: Note) {
    this.noteDoc = this.afs.doc(`notes/${note._id}`);
    this.noteDoc.delete();
  }

  update(note: Note){
    this.noteDoc = this.afs.doc(`notes/${note._id}`);
    this.noteDoc.update(note);
  }

}