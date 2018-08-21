import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PromotionsService } from '../promotions.service';

@Component({
  selector: 'app-details-promotion',
  templateUrl: './details-promotion.component.html',
  styleUrls: ['./details-promotion.component.css']
})
export class DetailsPromotionComponent implements OnInit {
  promotion;
  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.promotionService.getPromotion(id).subscribe(response => {
      this.promotion = response.promotion;
    });
  }

}
