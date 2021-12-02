import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { ApiFirestoreService } from '../_core/services/api-firestore/api-firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // postForm: FormGroup;
  items: Observable<any[]>;
  username: string;
  constructor(firestore: Firestore,
              // private formBuilder: FormBuilder,
              // private apiFirestoreService: ApiFirestoreService
              ) {
    const group = collection(firestore, 'items');
    this.items = collectionData(group);

    // this.postForm = this.formBuilder.group({
  	// 	title: ['', Validators.required],
  	// 	note: ['', Validators.required],
    // });
  }

  addCollection() {
    // const formData = this.postForm.getRawValue();
    // this.apiFirestoreService.create(formData);
    console.log('it does nothing');
    // , formData
  }
}
