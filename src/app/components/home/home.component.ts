import { Component } from '@angular/core';
import { NoteComponent } from "../note/note.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
