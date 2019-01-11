import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'searchFilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any, field: string, value: string) {
    return items.pipe(filter(school => school.field === value));
  }
}

