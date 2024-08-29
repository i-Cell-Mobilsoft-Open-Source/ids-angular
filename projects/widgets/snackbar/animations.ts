import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const snackbarAnimation: AnimationTriggerMetadata = trigger('snackbarAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translate({{ translateX }}px, {{ translateY }}px)',
      height: '{{ height }}',
    }),
    animate(
      '0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      style({
        opacity: 1,
        transform: 'translate(0px, 0px)',
        height: '*',
      })),
  ], {
    params: {
      translateY: 0,
      translateX: 0,
      height: '0',
    },
  }),
  transition(':leave', [
    animate('1s ease-out', style({
      opacity: '0',
      transform: 'translate({{ translateX }}px, {{ translateY }}px)',
      height: '{{ height }}',
    })),
  ], {
    params: {
      translateY: 0,
      translateX: 0,
      height: '0',
    },
  }),
]);
