import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { AddNote } from '../../interfaces/add-note';
import { CardModule } from 'primeng/card';
import { NgFor } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { SearchPipePipe } from "../../pipes/search-pipe.pipe";
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    NgFor,
    ToastModule,
    RippleModule,
    SearchPipePipe
],
  providers:[MessageService],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit{

  isAddDialogVisible: boolean = false;
  allNotes: AddNote[] = [];
  isEditDialogVisible: boolean = false;
  searchKey:string = "";
  addNote:FormGroup = new FormGroup({
    title: new FormControl(null),
    content: new FormControl(null)
  })

  updateNote:FormGroup = new FormGroup({
    title: new FormControl(null),
    content: new FormControl(null),
    _id: new FormControl(null)
  })



constructor(private _NoteService:NoteService, private messageService: MessageService){}



showDialogUpdate() {
  this.isEditDialogVisible = true;
}

showDialog() {
    this.isAddDialogVisible = true;
}

ngOnInit(): void {
 this.getNotes()
}


addnote(form:FormGroup){
  this._NoteService.addNote(form.value).subscribe({
    next: (data) => {
      console.log(data);
      form.reset();
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Added' });

      this.getNotes();
    },
    error: (error) => {
      console.log(error);
    }
  })

}


getNotes() {
  this._NoteService.getNote().subscribe({
    next: (data) => {
      console.log(data);
      this.allNotes = data.notes;
    },
    error: (error) => {
      console.log(error);
    }
  })
}

deleteNote(id: string){
  this._NoteService.deleteNote(id).subscribe({
    next: (data) => {
      console.log(data);
      this.getNotes();
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Deleted' });

    },
    error: (error) => {
      console.log(error);
    }
  })
}


setUpdate(note:any){
this.updateNote.patchValue(note)
}


updateNotes(){
  const { _id , title , content} = this.updateNote.value
  this._NoteService.updateNote({title, content},_id).subscribe({
    next: (data) => {
      console.log(data);
      this.getNotes();
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Updated' });
      this.isEditDialogVisible = false;
    },
    error: (error) => {
      console.log(error);
    }
  })
}

}
