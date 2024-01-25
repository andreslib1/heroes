import { Component, Input } from '@angular/core';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  hero!: Hero;

  ngOnInit(): void{
    if( !this.hero ) throw Error ('Hero property is required')
  }
}
