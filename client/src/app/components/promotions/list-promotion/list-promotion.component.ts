import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../../../core/services/promotions.service';
@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {

  constructor(private adsService: PromotionsService) { }

  ngOnInit() {
  }

}
