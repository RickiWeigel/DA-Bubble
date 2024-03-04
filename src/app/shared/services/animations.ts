import { animate, state, style, transition, trigger } from '@angular/animations';

//Animation Slide in und out zur anwendung auf eine klasse .
// auf die klasse muss eine [@slideAnimation]="animationState" gestzt werden .
// triggern mit animationState ( 'in' oder 'out' ) beispiel in der sign_up.


export const slideAnimation = trigger('slideAnimation', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => in', [
      style({ transform: 'translateY(100%)', opacity: 0 }),
      animate('0.5s ease-out')
    ]),
    state('out', style({ transform: 'translateY(100%)', opacity: 0 })),
    transition('in => out', [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate('0.5s ease-out')
    ])
  ]);


// einzel animations. einbinden unter animations[slideInUpAnimation] und dann auf die
// klasse auf die es angewendet werden soll @slideInUp anheften .
// Besipiel login
export const slideInUpAnimation = trigger('slideInUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);

export const slideOutDownAnimation = trigger('slideOutDown', [
    transition(':leave', [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate('0.8s ease', style({ transform: 'translateY(100%)', opacity: 0 })),
    ]),
  ]);