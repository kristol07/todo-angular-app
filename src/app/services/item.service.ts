import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { Item } from '../models/item';
import { catchError, defaultIfEmpty, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private _apiPath: string = `https://localhost:5001/api/todolist`;

  constructor(private httpClient: HttpClient) { }

  getItem(id: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this._apiPath}/${id}`)
      .pipe(
        catchError(this.handleError<Item>(`getItem id=${id}`, null)));
  }

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this._apiPath}`)
      .pipe(
        catchError(this.handleError('getItems', [])),
      );
  }

  updateItem(item: Item): Observable<Item> {
    return this.httpClient.patch<Item>(`${this._apiPath}/${item.id}`, item)
      .pipe(
        catchError(this.handleError<Item>(`update Item ${item.id}`)),
      );
  }

  upsertItem(item: Item): Observable<Item> {
    return this.httpClient.put<Item>(`${this._apiPath}`, item)
      .pipe(
        catchError(this.handleError<Item>(`upsert Item ${item.id}`)),
      );
  }

  addItem(item: Item) {
    return this.httpClient.post<Item>(`${this._apiPath}`, item)
      .pipe(
        catchError(this.handleError<Item>(`add Item ${item.id}`)),
      );
  }

  deleteItem(id: string) {
    return this.httpClient.delete<Item>(`${this._apiPath}/${id}`)
      .pipe(
        catchError(this.handleError<Item>(`delete Item id=${id}`)));
  }

  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      return this.getItems();
    }
    return this.httpClient.get<Item[]>(`${this._apiPath}/?description=${term}`)
      .pipe(
        tap(_=>console.log("search Items")),
        catchError(this.handleError<Item[]>(`searchItems ${term}`, []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(message);
  }
}
