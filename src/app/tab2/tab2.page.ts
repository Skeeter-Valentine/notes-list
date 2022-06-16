import { Component, OnInit} from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NoteService } from '../_core/services/note/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  notes: Promise<any[]>;
  editingNote: boolean[]=[false];
  postForm: FormGroup;
  constructor(private firestore: Firestore,
              private formBuilder: FormBuilder,
              private noteService: NoteService,
              ) {

    // this.notes = async(resolve, reject)=> {await this.noteService.getData('notes')};
    // console.log(this.notes);


    // const docRef = collection(firestore, 'notes').doc<T>(id);
    // const group = collection(firestore, 'notes');
    // this.notes = collectionData(group);

    // this.postForm = this.formBuilder.group({
  	// 	title: ['', ValidatoMy crs.required],
  	// 	note: ['', Validators.required],
    // });
  }

  ngOnInit(): void {
    this.noteService.getData('notes');
  }

  // getNotes()
  // addCollection() {
  //   const formData = this.postForm.getRawValue();
  //   console.log(formData);
  //   this.noteService.create(formData, 'notes');
  // }

  // delete(){
  //    deleteDoc(doc(this.firestore, 'notes', 'Note 3'));
  // }

  // edit(){
  //   this.editingNote=[true];
  // }
}
