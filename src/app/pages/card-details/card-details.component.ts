import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Card } from 'src/app/shared/card.model';
import { CardsService } from 'src/app/shared/cards.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  card: Card;
  cardId: number;
  new: boolean;

  // Get the service by depency injection
  constructor(private cardsService: CardsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Creating new card or editing existing card
    this.route.params.subscribe((params: Params) => {
      this.card = new Card();
      if (params.id) {
        this.card = this.cardsService.get(params.id);
        this.cardId = params.id;
        this.new = false;
      }
      else {
        this.new = true;
      }
    })    

    
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      // Save the card
    this.cardsService.add(form.value);    
    }
    else {
      this.cardsService.update(this.cardId, form.value.title, form.value.body);
    }

    this.router.navigateByUrl('/');    
  }

  cancel() {
    this.router.navigateByUrl("/");
  }

}
