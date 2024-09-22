import { Pipe, PipeTransform } from '@angular/core';
import { AddNote } from '../interfaces/add-note';

@Pipe({
  name: 'searchPipe',
  standalone: true
})
export class SearchPipePipe implements PipeTransform {

  transform(note: AddNote[], searchKey: string):AddNote[]  {

    return note.filter((ele)=> ele.title.toLowerCase().includes(searchKey.toLowerCase()))
  }

}


