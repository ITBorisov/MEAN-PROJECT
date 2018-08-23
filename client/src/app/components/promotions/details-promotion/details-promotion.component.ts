import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PromotionsService } from '../promotions.service';
import { ToastrService } from 'ngx-toastr';

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
    private promotionService: PromotionsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', {validators: [Validators.required]})
    });

    this.promotionId = this.route.snapshot.paramMap.get('id');
    this.fetchPromotion(this.promotionId);
    // this.promotionService.getPromotion(this.promotionId).subscribe(response => {
    //   this.promotion = response.promotion;
    //   console.log(this.promotion);
    // });
  }


  addComment() {
    if (this.commentForm.invalid) {
      return;
    }

    this.promotionService.postNewComment(this.promotionId, this.commentForm.value).subscribe(response => {
      if (response.success) {
        this.fetchPromotion(this.promotionId);
        this.toastr.success(response.message);
      } else {
        this.toastr.success(response.message);
      }
    });

  }

 fetchPromotion(id: string) {
  this.promotionService.getPromotion(this.promotionId).subscribe(response => {
    this.promotion = response.promotion;
    console.log(this.promotion);
  });
 }

}
