import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Promotion } from '../../components/promotions/promotion.model';
const BACKEND_URL = 'http://localhost:3001/api';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {


  constructor(private http: HttpClient) { }

  addPromotion(title: string, content: string) {
    const promotion = { title: title, content: content};

    this.http.post<{message: string}>(BACKEND_URL + '/promotions', promotion).subscribe((response) => {
      console.log(response.message);
    });
  }

  getPromotion() {
    return this.http.get<{message: string, promotions: {}}>(BACKEND_URL + '/promotions');
  }

  deletePromotion(itemId) {
    this.http.delete(BACKEND_URL + '/promotions/' + itemId).subscribe(result => {
      console.log(result);
    });
  }
}
