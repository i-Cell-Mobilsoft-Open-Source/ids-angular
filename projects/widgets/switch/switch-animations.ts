import { animate, AnimationTriggerMetadata, query, style, transition, trigger } from '@angular/animations';

export const switchAnimation: AnimationTriggerMetadata = trigger('switchAnimation', [
  transition('off <=> on', [
    query('.ids-icon:enter', [
      style({ opacity: 0 }),
      animate('0.1s ease-in', style({ opacity: 1 })),
    ], { optional: true }),
    query('.ids-icon:leave', [animate('0.1s ease-out', style({ opacity: 0 }))], { optional: true }),
  ]),
]);
