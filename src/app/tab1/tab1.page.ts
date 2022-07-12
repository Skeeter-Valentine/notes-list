import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../_core/services/note/note.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  postForm: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private noteService: NoteService
              ) {

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

}
