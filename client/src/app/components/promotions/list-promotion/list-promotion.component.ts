import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PromotionsService } from '../promotions.service';


@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {
  promotions;


  constructor(
    private promotionService: PromotionsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fetchPromotion();
  }

  like(id) {
    this.promotionService.like(id).subscribe(response => {
      if (response.success) {
        this.fetchPromotion();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  fetchPromotion() {
    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data.promotions;
      console.log(this.promotions);
    });
  }


}
