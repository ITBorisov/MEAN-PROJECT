import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostComments'
})
export class MostCommentsPipe implements PipeTransform {

  transform(promotions: any): any {
    promotions.sort((a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });

    return [...promotions].slice(0, 3);
  }

}
