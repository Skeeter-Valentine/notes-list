import { Component, OnInit} from '@angular/core';
import { Note } from '../_core/models/note';
import { NoteService } from '../_core/services/note/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  notes: any;
  editingNote: boolean = false;
  noteToEdit: any;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getData().subscribe(notes =>{
      console.log(notes);
      this.notes=notes;
      this.noteToEdit = false;
    });
  }

  delete(note){
    this.noteService.delete(note);
  }

  edit(event, note){
    this.editingNote = true;
    console.log(this.editingNote);
    this.noteToEdit = note;
    console.log(this.noteToEdit);
  }

  notEditing(){
    this.editingNote = false;
  }

  updateCollection(note){
    this.noteService.update(note);
    this.notEditing();
  }
}
