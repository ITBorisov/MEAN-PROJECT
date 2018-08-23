import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PromotionsService } from '../promotions.service';
import { SearchPipe } from '../search.pipe';

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

  sortByLikes() {
    console.log('likes');
    this.promotions = this.promotions.sort(this.compare);
  }

  sortByComments() {
    console.log('comments');
    this.promotions = this.promotions.sort(this.compareByComments);
  }

  compare(a, b) {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  }

  compareByComments(a, b) {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  }

}
