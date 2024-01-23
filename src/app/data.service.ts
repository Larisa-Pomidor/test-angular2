import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  API_URL = "https://flashcardsktorapp.onrender.com"
  //API_URL = "http://localhost:8080/"

  private cards$: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.cards$ = this.getAllCards();
  }

  private getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + "/api/v1/cards");
  }

  getCards(): Observable<any[]> {
    return this.cards$;
  }

  deleteCard(id: number) {
    this.http.delete(this.API_URL + "/api/v1/cards/" + id).subscribe(
      () => {
        console.log('DELETE request successful');
      },
      (error) => {
        console.error('Error during DELETE request:', error);
      }
    );  
  }

  addCard(formData: any) {
    this.http.post(this.API_URL + '/api/v1/cards', formData).subscribe(
      () => {
        console.log('Card ADDED');
      },
      (error) => {
        console.error('Error during ADDING', error);
      }
    );
  }
}