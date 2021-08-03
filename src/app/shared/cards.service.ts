import { Injectable } from '@angular/core';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: Card[] = new Array<Card>();

  constructor() { }

  getAll() {
    return this.cards;
  }

  get(id: number) {
    return this.cards[id];
  }

  getId(card: Card) {
    return this.cards.indexOf(card);
  }

  add(card: Card) {
    // Will add a card to the array and return id of the card where id=index
    let newLength = this.cards.push(card);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    let card = this.cards[id];
    card.title = title;
    card.body = body;
  }

  delete(id: number) {
    this.cards.splice(id, 1);
  }
}
