import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interface/hero.interface';

@Pipe({
  name: 'heroimage'
})
export class HeroimagePipe implements PipeTransform {

  transform(hero: Hero): string {
   if (!hero.id && !hero.alt_img){
      return 'assets/no-image.png'
   }

   return `assets/heroes/${hero.alt_img}.jpg`

  }




}
