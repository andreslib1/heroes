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
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtY2x4cmRxcmh2ZHZlZW5oZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxOTQ4ODcsImV4cCI6MjAyMDc3MDg4N30.s7sJ-m6IfHbtCsywwxrhNcKjPLb5DnUACJSxEJBESMA', // Reemplaza con tu API key de Supabase
    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtY2x4cmRxcmh2ZHZlZW5oZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxOTQ4ODcsImV4cCI6MjAyMDc3MDg4N30.s7sJ-m6IfHbtCsywwxrhNcKjPLb5DnUACJSxEJBESMA` // Reemplaza con tu API key de Supabase
  });

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

