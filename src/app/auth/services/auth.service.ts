import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from './user.interface';
import { Observable, map, of, tap, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User ;
  private currentUser: string | null = null;
  private currentUserKey = 'currentUser';
  
//Seccion definicion api key


////////////////////////////
  
  constructor(private http: HttpClient) { }

  // Método para obtener el nombre de usuario
  getUserName(): string | null {
    const storedUser = sessionStorage.getItem(this.currentUserKey);
    return storedUser ? storedUser : null;
  }

  // Método para guardar el nombre de usuario después del login
  private setUserName(userName: string): void {
          this.currentUser = userName;
          sessionStorage.setItem(this.currentUserKey, userName);
        }


  login(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users?email=eq.${email}`, { headers: this.headers })
    .pipe(
      tap(user => {
        if (user && user.length > 0){
          const userName = user[0].user_name;
          this.setUserName(userName)
        }
      })
    );
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token'); // Obtiene el token de localStorage
    // Aquí podrías añadir más lógica para verificar la validez del token si es necesario
    return !!token; // Devuelve true si hay un token, false si no hay
  }

logout(){
  this.user = undefined;
  sessionStorage.removeItem(this.currentUserKey);
  localStorage.clear();
}

registerUser(user: User){
  return this.http.post<User>(`${this.baseUrl}/users`, user, {headers: this.headers});
}


  }

