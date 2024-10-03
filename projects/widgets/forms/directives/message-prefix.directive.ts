import { Directive } from '@angular/core';

@Directive({
  selector: '[idsMessagePrefix]',
  standalone: true,
})
export class IdsMessagePrefixDirective {
  constructor() { }
}
