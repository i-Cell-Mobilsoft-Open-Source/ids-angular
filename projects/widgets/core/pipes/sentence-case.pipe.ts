import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
  standalone: true,
})
export class IdsSentenceCasePipe implements PipeTransform {
  public transform(value: string): unknown {
    return value.charAt(0).toUpperCase().concat(value.substring(1));
  }

}
