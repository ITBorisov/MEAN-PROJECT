import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PromotionsService } from '../../promotions/promotions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(
    private authService: AuthService,
    private promotionService: PromotionsService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(response => {
      this.user = response;
      console.log(response);
    });

    this.promotionService.getMyPromotions().subscribe(response => {
      console.log(response);
    });
  }

}
