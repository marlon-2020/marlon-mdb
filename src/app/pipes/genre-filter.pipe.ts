import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreFilter'
})
export class GenreFilterPipe implements PipeTransform {

  transform(values: any[]): string {
    let arr = []
    for(let value of values){
      arr.push(value.name)
    }
    return arr.join(' - ');
  }
}
