import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../services/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {


  userForm = new FormGroup({

    id:               new FormControl <string> (''),
    email:            new FormControl('',[Validators.required,Validators.email]),
    user_name:        new FormControl('',[Validators.required]),

})


  constructor( 
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ){}

  get newUser(): User  {
  
    const user = this.userForm.value as User
  
    return user;
  } 


    onSubmit(){

      
      if(this.userForm.invalid) return;

      const newId = this.generateNewId();

      // Crear un nuevo objeto hero con el nuevo ID
      const userWithId = {
        ...this.newUser,
        id: newId
      };
      //console.log(userWithId)
      this.authService.registerUser(userWithId)
      .subscribe({
        next: (hero) => {                                            //mensaje en caso de exito
          //console.log(hero);
          this.showSnackbar(`Usuario Creado con exito`);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {                                          //mensaje en caso de error
          //console.error(error);
          this.showSnackbar(`Error al crear usuario`);
    
          
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

    showSnackbar(message: string): void{
      this.snackbar.open(message, 'Cerrar', {
        duration: 6000,
      })
    }

}
