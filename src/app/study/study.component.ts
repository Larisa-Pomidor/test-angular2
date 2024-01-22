import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent {
  card: any
  flipActive = false
  hideCard = false

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.card = this.setRandomCard()
  }

  changeCard() {
    this.flipActive = false;
    this.hideCard = true;
    setTimeout(() => {
      this.card = this.setRandomCard();
      this.hideCard = false
    }, 200);
  }

  setRandomCard() {
    return this.dataService.cards[Math.floor(Math.random() * this.dataService.cards.length)];
  }

  flipCard() {
    this.flipActive = !this.flipActive;
  }
}
