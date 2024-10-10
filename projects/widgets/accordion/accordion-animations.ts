import { trigger, state, style, transition, animate } from '@angular/animations';

export const accordionAnimations = trigger('accordionAnimations', [
  state('expanded', style({
    height: '*',
    opacity: 1,
    transform: 'scaleY(1)',
    visibility: '',
  })),
  state('collapsed', style({
    height: '0',
    opacity: 0,
    transform: 'scaleY(0.3)',
    padding: 0,
    visibility: 'hidden',
  })),
  transition('expanded => collapsed', [animate('0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)')]),
  transition('collapsed => expanded', [animate('0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940)')]),
]);
