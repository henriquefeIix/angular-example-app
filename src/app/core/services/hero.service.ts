/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes) => this.log(`Fetched ${heroes.length} Heroes`))
    );
  }

  getOne(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.getUrl(id)).pipe(
      tap((hero) => this.log(`Fetched Hero - ${hero.name}`))
    );
  }

  private log(message: string): void {
    this.messageService.add(`Hero Service: ${message}`)
  }

  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero) => this.log(`Created ${this.descAttribute(hero)}`))
    );
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.getUrl(hero.id), hero).pipe(
      tap((hero) => this.log(`Updated ${this.descAttribute(hero)}`))
    );
  }

  delete(hero: Hero): Observable<Hero> {
    return this.http.delete<Hero>(this.getUrl(hero.id)).pipe(
      tap(() => this.log(`Deleted ${this.descAttribute(hero)}`))
    );
  }

  descAttribute(hero: Hero): string {
    return `Hero - ${hero.name}`;
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }

}
