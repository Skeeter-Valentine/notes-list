import { Component, OnInit} from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NoteService } from '../_core/services/note/note.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  notes: any;
  editingNote: boolean[]=[false];
  postForm: FormGroup;
  constructor(private firestore: Firestore,
              private formBuilder: FormBuilder,
              private noteService: NoteService,
              ) {
    // this.notes = async(resolve, reject)=> {await this.noteService.getData('notes')};
    // console.log(this.notes);

    this.postForm = this.formBuilder.group({
  		title: ['', Validators.required],
  		note: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.noteService.getData().subscribe(notes =>{
      console.log(notes);
      this.notes=notes;
    });
  }

  // getNotes()
  // addCollection() {
  //   const formData = this.postForm.getRawValue();
  //   console.log(formData);
  //   this.noteService.create(formData, 'notes');
  // }

  delete(note){
    console.log(note);
    this.noteService.delete(note);
    //  deleteDoc(doc(this.firestore, 'notes', 'Note 3'));
  }

  edit(i){
    this.editingNote[i]=true;
  }

  notEditing(i){
    this.editingNote[i]=false;
  }

  updateCollection(note){
    // const formData = this.postForm.getRawValue();
    // console.log(formData);
    console.log(note);
    this.noteService.update(note);
    // this.notEditing(i);
  }
}
