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
  cards: any;

  constructor(private dataService: DataService) {
    this.dataService.getCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  deleteCard(id: number) {
    this.dataService.deleteCard(id);
  }
}
