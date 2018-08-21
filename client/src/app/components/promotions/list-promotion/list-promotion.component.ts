import { Component, OnInit } from '@angular/core';

import { PromotionsService } from '../promotions.service';
import { AuthService } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {
  private isAuth = false;
  private authListenerSubs: Subscription;
  promotions;
  userId;

  constructor(
    private promotionService: PromotionsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthState().subscribe(result => {
      this.isAuth = result;
    });
    this.userId = this.authService.getUserId();


    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data.promotions;
      console.log(this.promotions);
    });
  }

  delete(itemId) {
    this.promotionService.deletePromotion(itemId);
  }

}
