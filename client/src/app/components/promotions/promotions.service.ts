import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Promotion } from './promotion.model';
import { Router } from '@angular/router';
const BACKEND_URL = 'http://localhost:3001/api';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  addPromotion(data) {
    const promotion = data;

    this.http.post<{message: string}>(BACKEND_URL + '/promotions', promotion).subscribe((response) => {
      console.log(response.message);
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
      console.log(response);
    });
  }

  deletePromotion(itemId) {
    this.http.delete(BACKEND_URL + '/promotions/' + itemId).subscribe(result => {
      console.log(result);
    });
  }

  getMyPromotions() {
    return this.http.get<{ promotions: {}}>(BACKEND_URL + '/promotions/mypromotion');
  }
}
