import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationTimeStamp',
  standalone: true
})
export class DurationTimeStampPipe implements PipeTransform {

  transform(str: string): string {
    if (str) {
      let ptRemoved = str.slice(2);
      let spaced = ptRemoved.slice(0, ptRemoved.indexOf("H") + 1) + " " + ptRemoved.slice(ptRemoved.indexOf("H") + 1);
      return spaced;
    }
    return ''
    
  }

}
