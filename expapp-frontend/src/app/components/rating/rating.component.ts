import { Profile } from '../../models/profile.class';
import { Component, OnInit, Input } from '@angular/core';

const MAX_RATE = 5;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input('profile') profile: Profile;
  @Input('disabled') disabled: Boolean = false;
  ratingArray: Array<number> = [];
  rating: number;

  constructor() {
    for(let index = 0; index < MAX_RATE; index++ ) {
      this.ratingArray[index] = index + 1;
    }
   }

  ngOnInit() {
    this.rating = this.profile.getRaiting();
  }

  setRating(value: number) {
    if(!this.disabled) {
      this.rating = value;
      this.profile.setRating(value);
    }
  }

}
