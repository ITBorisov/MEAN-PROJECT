import { Component, OnInit } from '@angular/core';

import { PromotionsService } from '../promotions/promotions.service';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // private isAuth = false;
  // private authListenerSubs: Subscription;
  // promotions;
  // userId;

  constructor(
    private promotionService: PromotionsService,
    private authService: AuthService) { }

  ngOnInit() {
    // this.isAuth = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService.getAuthState().subscribe(result => {
    //   this.isAuth = result;
    // });
    // this.userId = this.authService.getUserId();


    // this.promotionService.getAllPromotions().subscribe(data => {
    //   this.promotions = data.promotions;
    //   console.log(this.promotions);
    // });
  }

  delete(itemId) {
    this.promotionService.deletePromotion(itemId);
  }

}
