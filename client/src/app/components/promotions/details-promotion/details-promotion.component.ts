import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PromotionsService } from '../promotions.service';

@Component({
  selector: 'app-details-promotion',
  templateUrl: './details-promotion.component.html',
  styleUrls: ['./details-promotion.component.css']
})
export class DetailsPromotionComponent implements OnInit {
  promotion;
  commentForm: FormGroup;
  promotionId;
  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionsService
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', {validators: [Validators.required]})
    });

    this.promotionId = this.route.snapshot.paramMap.get('id');
    this.promotionService.getPromotion(this.promotionId).subscribe(response => {
      this.promotion = response.promotion;
      console.log(this.promotion);
    });
  }


  addComment() {
    if (this.commentForm.invalid) {
      return;
    }
    console.log('aaadwd');
    this.promotionService.postNewComment(this.promotionId, this.commentForm.value);

  }

}
