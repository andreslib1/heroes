import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

import { switchMap } from 'rxjs';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit{

  isLoading = false;

  heroForm = new FormGroup({

            id:               new FormControl <string> (''),
            superhero:        new FormControl <string> ('', {nonNullable: true} ),
            publisher:        new FormControl <Publisher> ( Publisher.DCComics ),
            alter_ego:        new FormControl(''),
            first_appearance: new FormControl(''),
            characters:       new FormControl(''),
            alt_img:          new FormControl(''),
  })

  publisher = [
    { id: 'DC Comics', desc: 'DC Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
];

constructor( private heroesService: HeroesService,
              private activatedRouter: ActivatedRoute, 
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog){}

  ngOnInit(): void {

    if (!this.router.url.includes ('edit')) return;

    this.activatedRouter.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroByid(id)),
    ).subscribe( heroes =>{
      //console.log(heroes)
     if (!Array.isArray(heroes) || heroes.length === 0) {                     // Asegúra de que 'heroes' sea un array con al menos un elemento
      return this.router.navigateByUrl('/');
    }
        const hero = heroes[0];                                              // Si 'heroes' es un array y tiene elementos, usa el primero
        this.heroForm.reset( hero );                                         //llena el formulario segun el id correspondiente
        return;
      

    });
    


  }


get currentHero(): Hero  {
  
  const hero = this.heroForm.value as Hero

  return hero;
}
onSubmit():void{
  
  

  if (this. heroForm.invalid ) return;

  this.isLoading = true;
  
  if (this.currentHero.id){
    
    this.heroesService.updateHero(this.currentHero)
      .subscribe({
        next: (hero) => {                                            //mensaje en caso de exito
          //console.log(hero);
          this.isLoading = false;
          this.showSnackbar(`Datos del heroe actualizados`);
        },
        error: (error) => {                                          //mensaje en caso de error
          //console.error(error);
          this.showSnackbar(`Error al actualizar los datos del héroe`);
          
        }
      });

    return;
  } 

  //Se ejecuta en caso de crear un nuevo heroe

  const newId = this.generateNewId();

    // Crear un nuevo objeto hero con el nuevo ID
    const heroWithId = {
      ...this.currentHero,
      id: newId
    };


    this.heroesService.addHero(heroWithId)

    .subscribe({
      next: (hero) => {                                            //mensaje en caso de exito
        //console.log(hero);
        this.isLoading = false;
        this.showSnackbar(`Heroe creado con exito`);
        this.router.navigate(['/heroes/list']);
      },
      error: (error) => {                                          //mensaje en caso de error
        //console.error(error);
        this.showSnackbar(`Error al crear heroe`);
        this.isLoading = false;
        
      }
    });
  }


  private generateNewId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  

  onDeleteHero(){
    if (!this.currentHero.id ) throw Error ('El heroe es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.heroesService.deleteHeroById(this.currentHero.id)
      .subscribe(wasDeleted =>{ 
        if(wasDeleted)

        this.router.navigate(['/heroes/list'])

      })
      
    });

  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'Cerrar', {
      duration: 3000,
    })
  }
}
