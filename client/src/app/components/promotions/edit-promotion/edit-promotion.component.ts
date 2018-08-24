import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PromotionsService } from '../promotions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {
  promotion;
  form: FormGroup;
  promotionId;
  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionsService
  ) { }

  ngOnInit() {
    this.promotionId = this.route.snapshot.paramMap.get('id');
    this.promotionService.getPromotion(this.promotionId).subscribe(response => {
      this.promotion = response.promotion;
      console.log(this.promotion);
      this.form.setValue({
        title: this.promotion.title,
        content: this.promotion.content,
        image: this.promotion.image,
        price: this.promotion.price
      });
    });

    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl('', { validators: [Validators.required, Validators.minLength(20)] }),
      image: new FormControl('', { validators: [Validators.required]}),
      price: new FormControl('', { validators: [Validators.required]})
    });
  }


  editPromotion() {

    if (this.form.invalid) {
      return;
    }

    this.promotionService.editPromotion(this.form.value, this.promotionId);
  }

}
