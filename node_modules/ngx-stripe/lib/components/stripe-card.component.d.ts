import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Element as StripeElement, ElementOptions, ElementEventType } from '../interfaces/element';
import { StripeService } from '../services/stripe.service';
import { ElementsOptions } from '../interfaces/elements';
import { StripeInstance } from '../services/stripe-instance.class';
export declare class StripeCardComponent implements OnInit {
    stripeService: StripeService;
    card: EventEmitter<StripeElement>;
    on: EventEmitter<{
        type: ElementEventType;
        event: any;
    }>;
    stripeCard: ElementRef;
    element: StripeElement;
    options: ElementOptions;
    options$: BehaviorSubject<ElementOptions>;
    elementsOptions: ElementsOptions;
    elementsOptions$: BehaviorSubject<ElementsOptions>;
    stripe: StripeInstance;
    stripe$: BehaviorSubject<StripeInstance>;
    constructor(stripeService: StripeService);
    ngOnInit(): void;
    getCard(): StripeElement;
}
