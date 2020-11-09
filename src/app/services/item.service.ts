import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { Item } from '../models/item';
import { catchError, defaultIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _apiPath: string = `https://localhost:5001/api/todolist`;

  constructor(private httpClient: HttpClient) { }

  existsItem(id: string): boolean {
    let item: Item;
    this.getItem(id).pipe(defaultIfEmpty(null))
      .subscribe(val => item = val);
    return item === null 
      ? false 
      : true;
  }

  getItem(id: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this._apiPath}/${id}`)
      .pipe(catchError(this.handleError<Item>(`getItem id=${id}`)));
  }

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this._apiPath}`)
      .pipe(catchError(this.handleError('getItems', [])));
  }

  updateItem(item: Item): Observable<Item> {
    return this.httpClient.put<Item>(`${this._apiPath}/${item.id}`, item)
      .pipe(catchError(this.handleError<Item>('update Item')));
  }

  addItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(`${this._apiPath}`, item)
      .pipe(catchError(this.handleError<Item>('add Item')));
  }

  deleteItem(id: string) {
    return this.httpClient.delete<Item>(`${this._apiPath}/${id}`)
      .pipe(catchError(this.handleError<Item>(`delete Item id=${id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
