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
      this.notes=notes;
    });
    this.noteToEdit = null;
  }

  delete(note){
    this.noteService.delete(note);
  }

  edit(note){
    this.editingNote = true;
    this.noteToEdit = note;
  }

  notEditing(){
    this.editingNote = false;
  }

  updateCollection(note){
    this.noteService.update(note);
    this.notEditing();
  }
}
