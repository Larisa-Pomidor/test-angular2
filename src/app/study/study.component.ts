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

  currentIndex = 0

  isReverted = false
  scoreArray = new Array();

  checkingPart = 0.04

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.scoreArray = new Array(this.dataService.cards.length).fill(0);
    this.card = this.setRandomCard()
  }

  changeCard() {
    console.log(this.scoreArray)
    this.flipActive = false;
    this.hideCard = true;
    setTimeout(() => {
      this.card = this.setRandomCard();
      this.hideCard = false
    }, 200);
  }

  chooseCard() {
    let cardsToCheck = Math.floor(this.dataService.cards.length * this.checkingPart)

    let currentCheckIndex = Math.floor(Math.random() * this.dataService.cards.length);
    let currentScore = this.scoreArray[currentCheckIndex];

    let minResult = this.scoreArray[currentCheckIndex];
    let minIndex = currentCheckIndex;

    for (let i = 0; i < cardsToCheck - 1; i++) {
      currentCheckIndex = Math.floor(Math.random() * this.dataService.cards.length);
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
    return this.dataService.cards[this.currentIndex];
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
  }

  setFailedCard() {
    this.scoreArray[this.currentIndex]--;
    this.changeCard()
  }
}
