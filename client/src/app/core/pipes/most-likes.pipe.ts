import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostLikes'
})
export class MostLikesPipe implements PipeTransform {

  transform(promotions: any): any {
    promotions.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      }
      return 0;
    });

    return [...promotions].slice(0, 3);
  }

}
