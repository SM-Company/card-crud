import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent implements OnInit {
  cards: Card[] = [];
  constructor(
    private firestore: AngularFirestore,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cardService.getCards().subscribe((data) => {
      this.cards = data.map((card: Card) => ({
        id: card.payload.doc.id, ...card.payload.doc.data()
      }));
    });
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id)
  }

  getMaskedCardNumber(cardNumber: number) { 
    return cardNumber.toString().slice(0, 2) + '**********' + cardNumber.toString().slice(-4);
  }
}
