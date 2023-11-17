import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {

  constructor(private firestore: AngularFirestore) {}

  getCards(): Observable<any> {
    return this.firestore.collection('cards').snapshotChanges();
  }

  getCard(id: string): Observable<any>{
    return this.firestore.collection('cards').doc(id).snapshotChanges();
  }

  addCard(card: Card): Promise<any> {
    return this.firestore.collection('cards').add(card);
  }

  deleteCard(id: string): Promise<any> {
    return this.firestore.collection('cards').doc(id).delete();
  }

  updateCard(id: string, card: Card): Promise<any> {
    return this.firestore.collection('cards').doc(id).update(card);
  }

}
