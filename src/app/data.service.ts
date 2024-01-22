import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  API_URL = "https://flashcardsktorapp.onrender.com"

  cards: any;
  constructor(private http: HttpClient) {
    this.getAllCards();
  }

  getAllCards() {
    this.http.get(this.API_URL + "/api/v1/cards")
      .subscribe((response) => {
        this.cards = response;
      });
  }

  deleteCard(id: number) {
    this.http.delete(this.API_URL + "/api/v1/cards/" + id).subscribe(
      () => {
        console.log('DELETE request successful');
        this.cards = this.cards.filter((element: any) => element.id !== id);
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