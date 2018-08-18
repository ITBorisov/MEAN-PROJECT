import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PromotionsService } from '../../../core/services/promotions.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  form: FormGroup;
  constructor(private promotionService: PromotionsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
  }

  saveAd() {

    if (this.form.invalid) {
      return;
    }

    this.promotionService.addPromotion(
      this.form.value.title,
      this.form.value.content
    );
  }

}
