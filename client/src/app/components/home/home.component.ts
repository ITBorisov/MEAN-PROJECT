import { Component, OnInit } from '@angular/core';

import { PromotionsService } from '../../core/services/promotions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promotions;
  constructor(private promotionService: PromotionsService) { }

  ngOnInit() {
    this.promotionService.getPromotion().subscribe(data => {
      this.promotions = data.promotions;
      console.log(this.promotions);
    });
  }

  delete(itemId) {
    this.promotionService.deletePromotion(itemId);
  }

}
