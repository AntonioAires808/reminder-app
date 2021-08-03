import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/card.model';
import { CardsService } from 'src/app/shared/cards.service';


@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // Entry animation; goes from not existing to any state
      transition('void => *', [
        // Initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)', 
            'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }),
        // First animate the spacing (height and margin)
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate(100)
      ]),

      // Element removed from the DOM, scale up and then down
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),

        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),

          animate('120ms ease-out', style({
            opacity: 0,
            transform: 'scale(0.68)'
          })),

          animate('150ms ease-out', style({
            opacity: 0,
            height: 0,
            'margin-bottom': '0',
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0
          }))
      ])
    ]),
    
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})

export class ReminderListComponent implements OnInit {

  cards: Card[] = new Array<Card>();
  filteredCards: Card[] = new Array<Card>();

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    // Retrive all notes from the service
    this.cards = this.cardsService.getAll();

    this.filteredCards = this.cards;
  }

  deleteCard(id: number) {
    this.cardsService.delete(id);
  }

  // Filter the reminders

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: Card[] = new Array<Card>();
    let terms: string[] = query.split(' ');

    terms = this.removeDuplicates(terms);
    terms.forEach(term => {
      let results: Card[] = this.relevantCards(term);
      allResults = [...allResults, ...results]
    });

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredCards = uniqueResults;
  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantCards(query: string) : Array<Card> {
    query = query.toLowerCase().trim();
    let relevantCards = this.cards.filter(card => {
      if (card.title && card.title.toLowerCase().includes(query)) {
        return true;
      }
      if (card.body && card.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    }) 

    return relevantCards;
  }
}