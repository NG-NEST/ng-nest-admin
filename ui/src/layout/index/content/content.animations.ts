import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        opacity: 0,
        top: 0,
        left: '1.5rem',
        width: '100%'
      })
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('50ms cubic-bezier(0,0,0.1,1)', style({ opacity: 0, left: '1.5rem' }))], { optional: true }),
      query(':enter', [animate('200ms cubic-bezier(0,0,0.1,1)', style({ opacity: 1, left: '0' }))], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true })
  ])
]);
