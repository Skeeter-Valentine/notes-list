import { Injectable } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiFirestoreService {

  protected collection: AngularFirestoreCollection;
  protected _path: string;

  constructor(private path: string,
              protected afs: AngularFirestore
              ) {
    this._path = path;
    this.collection = this.afs.collection(path);
   }

  create(data: any, id: string = null): Promise<any> {
    //this.logger.logVerbose(`[BaseService] creating item`, data);

    const promise = new Promise<any>((resolve, reject) => {
      if (!id) {id = this.afs.createId();}

      data.dateCreated = serverTimestamp();
      data._id = id;

      const today = new Date();
      data.isoDate = today.toISOString().substr(0, 10);

      this.collection.doc(id).set(data).then(ref => {
        resolve(data);
      },
      err => {
        reject(err);
      });
    });
    return promise;
  }
}
