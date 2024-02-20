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
  cards: any
  card: any
  current: any

  flipActive = false
  hideCard = false

  currentIndex = 0

  isReverted = false
  scoreArray = new Array();

  checkingPart = 0.04

  constructor(private dataService: DataService) {
    this.dataService.getCards().subscribe(cards => {
      this.cards = cards;
      this.current = 0
      this.scoreArray = new Array(this.cards.length).fill(0);
      this.card = this.setRandomCard()
    });

    setInterval(() => {
      this.dataService.getCard(this.cards[0].id).subscribe(card => {
        console.log(card)
      });
    }, 300000);
  }

  changeCard() {
    this.flipActive = false;
    this.hideCard = true;
    setTimeout(() => {
      this.card = this.setRandomCard();
      this.hideCard = false
    }, 200);
  }

  chooseCard() {
    let cardsToCheck = Math.floor(this.cards.length * this.checkingPart)

    let currentCheckIndex = Math.floor(Math.random() * this.cards.length);
    let currentScore = this.scoreArray[currentCheckIndex];

    let minResult = this.scoreArray[currentCheckIndex];
    let minIndex = currentCheckIndex;

    for (let i = 0; i < cardsToCheck - 1; i++) {
      currentCheckIndex = Math.floor(Math.random() * this.cards.length);
      currentScore = this.scoreArray[currentCheckIndex];

      if (currentScore < minResult) {
        minResult = currentScore;
        minIndex = currentCheckIndex
      }
    }
    return minIndex;
  }

  setRandomCard() {
    this.isReverted = this.setSide();
    this.currentIndex = this.chooseCard()
    return this.cards[this.currentIndex];
  }

  setSide() {
    return Math.round(Math.random()) == 0
  }

  flipCard() {
    this.flipActive = !this.flipActive;
  }

  setSuccessCard() {
    this.scoreArray[this.currentIndex]++;
    this.changeCard()
    this.current++
  }

  setFailedCard() {
    this.scoreArray[this.currentIndex]--;
    this.changeCard()
  }
}
