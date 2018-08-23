import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(promotions: any, search: any): any {
    if (search === undefined) { return promotions; }

    return promotions.filter(function(result) {
      return result.title.toLowerCase().includes(search.toLowerCase())
      || result.content.toLowerCase().includes(search.toLowerCase());
    });
  }

}
