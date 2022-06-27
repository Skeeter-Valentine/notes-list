import { Component } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../_core/services/note/note.service';
import { Note } from '../_core/models/note';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  postForm: FormGroup;
  notes: Observable<Note[]>;
  username: string;
  constructor(private firestore: Firestore,
              private formBuilder: FormBuilder,
              private noteService: NoteService
              ) {
    const group = collection(firestore, 'notes');
    this.notes = collectionData(group);

    // this.items = this.noteService.getData('items');

    this.postForm = this.formBuilder.group({
  		title: ['', Validators.required],
  		note: ['', Validators.required],
    });
  }

  addCollection() {
    const formData = this.postForm.getRawValue();
    console.log(formData);
    this.noteService.create(formData, 'notes');
  }

  // delete(){

  // }
}
