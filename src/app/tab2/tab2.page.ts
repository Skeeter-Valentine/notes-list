import { Component, OnInit} from '@angular/core';
import { NoteService } from '../_core/services/note/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  notes: any;
  editingNote: boolean[]=[false];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getData().subscribe(notes =>{
      console.log(notes);
      this.notes=notes;
    });
  }

  delete(note){
    this.noteService.delete(note);
  }

  edit(i){
    this.editingNote[i]=true;
  }

  notEditing(i){
    this.editingNote[i]=false;
  }

  updateCollection(note){
    this.noteService.update(note);
  }
}
