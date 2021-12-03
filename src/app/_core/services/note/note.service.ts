import { Injectable } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { addDoc, updateDoc, doc, Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  readonly colName: string = 'notes';

  constructor(private readonly firestore: Firestore) {
  }

  create(data: any, id: string = null): Promise<any> {
    return addDoc(collection(this.firestore, this.colName), data)
  }

  // https://github.com/angular/angularfire/blob/master/samples/modular/src/app/upboats/upboats.component.ts
}