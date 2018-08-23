import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Promotion } from './promotion.model';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

const BACKEND_URL = 'http://localhost:3001/api';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {


  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  addPromotion(data) {
    const promotion = data;

    this.http.post<{message: string}>(BACKEND_URL + '/promotions', promotion).subscribe((response) => {
      this.toastr.success('Нова промоция');
      this.router.navigate(['/']);
    });
  }

  getAllPromotions() {
    return this.http.get<{message: string, promotions: {}}>(BACKEND_URL + '/promotions');
  }

  getPromotion(id: string) {
    return this.http.get<{promotion: {}}>(BACKEND_URL + '/promotions/' + id);
  }

  editPromotion(data, id) {
    this.http.put(BACKEND_URL + '/promotions/' + id, data)
    .subscribe(response => {
      this.toastr.success('Успешен едит');
      this.router.navigate(['/profile']);
    });
  }

  deletePromotion(itemId) {
    this.http.delete(BACKEND_URL + '/promotions/' + itemId).subscribe(result => {
      this.toastr.success('Успешно изтрихте');
    });
  }

  getMyPromotions() {
    return this.http.get<{ promotions: {}}>(BACKEND_URL + '/promotions/mypromotion');
  }

  postNewComment(id, data) {
    const commentData = {
      id: id,
      comment: data.comment
    };

  this.http.post(BACKEND_URL + '/promotions/comment', commentData).subscribe(result => {
    console.log(result);
  });
  }

  like(id) {
    const likeData = {
      id: id
    };
    this.http.put(BACKEND_URL + '/promotions/like', likeData).subscribe(result => {
      console.log(result);
    });
  }
}
