import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddNote } from '../interfaces/add-note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _httpClient:HttpClient) { }



  addNote(data:AddNote):Observable <any> {
    return this._httpClient.post('https://note-sigma-black.vercel.app/api/v1/notes', data )
  }

  getNote():Observable <any> {
    return this._httpClient.get('https://note-sigma-black.vercel.app/api/v1/notes' )
  }

  updateNote(data:any, id: string):Observable <any> {
    return this._httpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,data )
  }



  deleteNote(id:string):Observable <any> {
    return this._httpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` )
  }
}
