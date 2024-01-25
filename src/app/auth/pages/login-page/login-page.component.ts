import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  username: string = '';
  loginError: boolean = false;

    constructor( 
      private authService: AuthService,
      private router: Router
      ){}



    onLogin(){
      this.authService.login(this.username).subscribe(user =>{
        if (user[0]){

          
          const fakeToken = 'token-test'; 
          localStorage.setItem('auth_token', fakeToken); 

          this.router.navigate(['heroes/list'])
        }else{
          console.log('no ingresado')
          this.loginError = true;
        }
      }, error =>{
        console.error(error);
        this.loginError = true;
      });

    }

}
