import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  cards: any[]=[];

  constructor(private dataService: DataService) {
    this.dataService.getCards().subscribe(cards => {
      this.cards = cards;
      this.cards.sort((a, b) => b.score - a.score);
    });
  }

  deleteCard(id: number) {
    this.dataService.deleteCard(id);
  }

  hideCard(id: number) {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      this.cards[cardIndex].score = -10000;
    }
    this.dataService.changeCardVisibility(id, this.cards[cardIndex]);
  }

  openCard(id: number) {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      this.cards[cardIndex].score = 0;
    }
    this.dataService.changeCardVisibility(id, this.cards[cardIndex]);
  }
}
