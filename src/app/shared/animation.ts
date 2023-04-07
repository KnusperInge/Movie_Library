import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const slidInAnimationLeft = [
  trigger('show', [
    transition(':enter', [
      style({ transform: 'translateX(150px)' }),
      animate('225ms', style({ transform: 'translateX(0)' })),
    ]),
  ]),
];
export const slidInAnimationRight = [
  trigger('showRight', [
    transition(':enter', [
      style({ transform: 'translateX(-300px)' }),
      animate('225ms', style({ transform: 'translateX(0)' })),
    ]),
  ]),
];
