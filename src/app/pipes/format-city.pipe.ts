import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatcity'
})
export class FormatCityPipe implements PipeTransform {

  transform(value: string): string {
    return value[0].toLocaleUpperCase()+value.substring(1).toLocaleLowerCase();
  }

}
