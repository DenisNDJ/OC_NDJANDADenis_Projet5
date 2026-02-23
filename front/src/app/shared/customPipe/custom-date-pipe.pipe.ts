import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipePipe implements PipeTransform {
  transform(value: string, format: string = 'medium'): string {
    if (!value || !value.includes(',')) return '';

    const [y, m, d] = value.split(',').map(Number);
    const date = new Date(y, m - 1, d);

    return new Intl.DateTimeFormat('fr-FR').format(date);
  }
}