import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Hero } from '../interface/hero.interface';
import { environments } from '../../../environments/environments';


@Injectable({ providedIn: 'root'})

export class HeroesService {

  
  private baseUrl: string = environments.baseUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtY2x4cmRxcmh2ZHZlZW5oZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxOTQ4ODcsImV4cCI6MjAyMDc3MDg4N30.s7sJ-m6IfHbtCsywwxrhNcKjPLb5DnUACJSxEJBESMA', // Reemplaza con tu API key de Supabase
    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtY2x4cmRxcmh2ZHZlZW5oZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxOTQ4ODcsImV4cCI6MjAyMDc3MDg4N30.s7sJ-m6IfHbtCsywwxrhNcKjPLb5DnUACJSxEJBESMA` // Reemplaza con tu API key de Supabase
  });

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{

    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`, {headers: this.headers});
  }

  getHeroByid(id: string): Observable<Hero|undefined>{
    return this.http.get<Hero>(`${ this.baseUrl }/heroes?id=eq.${id}`, {headers: this.headers})
    .pipe(
      catchError( error => of(undefined))
    )
  }

  getSugguestions (query: string): Observable<Hero[]>{
    const formattedQuery = encodeURIComponent(`%${query}%`);
    return this.http.get<Hero[]>(`${ this.baseUrl}/heroes?superhero=ilike.${formattedQuery}&limit=6`, {headers: this.headers})
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero, {headers: this.headers});
  }

  updateHero(hero: Hero): Observable<Hero>{
    //console.log('servicio',hero.id)
    if (!hero.id) {
      // Si el héroe no tiene ID, devuelve un Observable que emite un error.
      return throwError(() => new Error('El héroe es requerido y debe tener un ID.'));
    }
    return this.http.patch<Hero>(`${this.baseUrl}/heroes?id=eq.${hero.id}`, hero, { headers: this.headers })
    
  }
  
  deleteHeroById(id: string): Observable<boolean>{
    
    return this.http.delete(`${this.baseUrl}/heroes?id=eq.${id}`, { headers: this.headers })
    .pipe(
      catchError(err => of(false) ),
      map( resp => true)
    );
  }

}
