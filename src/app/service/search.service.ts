import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any, term: any): any {
    if (term === undefined) return items;

    return items.filter(function(item) {
      for(let property in item.persona){
        if (item.persona[property] === null){
          continue;
        }
        if(item.persona[property].toString().toLowerCase().includes(term.toLowerCase())){
          return true;
        }
      }
      return false;
    });
  }
  /*
 transform(items: any[], field: string, value: string): any[] {
   if (!value) return items;
   return items.filter(it => it[field] == value);
 }
 */
}