import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PromotionsService } from '../promotions.service';

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
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl('', { validators: [Validators.required, Validators.minLength(20)] }),
      image: new FormControl('', { validators: [Validators.required]}),
      price: new FormControl('', { validators: [Validators.required]})
    });
  }

  savePromotion() {

    if (this.form.invalid) {
      return;
    }

    this.promotionService.addPromotion(this.form.value);
  }

}
