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
      this.router.navigate(['/profile']);
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
    return this.http.delete<{success: boolean, message: string}>(BACKEND_URL + '/promotions/' + itemId);
  }

  getMyPromotions() {
    return this.http.get<{ promotions: {}}>(BACKEND_URL + '/promotions/mypromotion');
  }

  postNewComment(id, data) {
    const commentData = {
      id: id,
      comment: data.comment
    };

    return this.http.post<{success: boolean, message: string}>(BACKEND_URL + '/promotions/comment', commentData);
  }

  like(id) {
    const likeData = {
      id: id
    };
    return this.http.put<{success: boolean, message: string}>(BACKEND_URL + '/promotions/like', likeData);
  }
}
