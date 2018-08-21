import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PromotionsService } from '../../promotions/promotions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private isAuth = false;
  private authListenerSubs: Subscription;
  promotions;
  userId;
  user;

  constructor(
    private authService: AuthService,
    private promotionService: PromotionsService
  ) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthState().subscribe(result => {
      this.isAuth = result;
    });
    this.userId = this.authService.getUserId();

    this.authService.getProfile().subscribe(response => {
      this.user = response;
      console.log(response);
    });

    this.promotionService.getMyPromotions().subscribe(response => {
      this.promotions = response.promotions;
    });
  }

  delete(itemId) {
    this.promotionService.deletePromotion(itemId);
  }

}
