import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

  hero?: Hero;

  constructor( private HeroesService: HeroesService, private activatedRouted: ActivatedRoute, private router: Router) {}

ngOnInit(): void {
  this.activatedRouted.params
  .pipe(
    switchMap (({id}) => this.HeroesService.getHeroByid(id)), 
  ).subscribe( heroes => {
    if (!Array.isArray(heroes) || heroes.length === 0) return this.router.navigate([ '/heroes/list' ]);           // Asegúra de que 'heroes' sea un array con al menos un elemento

    this.hero = heroes[0];
    return;
  })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }

}


