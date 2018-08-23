import { Component, OnInit } from '@angular/core';

import { PromotionsService } from '../promotions.service';


@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {
  promotions;


  constructor(
    private promotionService: PromotionsService) { }

  ngOnInit() {
    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data.promotions;
      console.log(this.promotions);
    });
  }

  like(id) {
    this.promotionService.like(id);
  }


}
