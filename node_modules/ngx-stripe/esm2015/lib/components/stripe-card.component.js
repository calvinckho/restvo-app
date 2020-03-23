/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { StripeService } from '../services/stripe.service';
import { StripeInstance } from '../services/stripe-instance.class';
export class StripeCardComponent {
    /**
     * @param {?} stripeService
     */
    constructor(stripeService) {
        this.stripeService = stripeService;
        this.card = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
        this.on = new EventEmitter();
        this.options$ = new BehaviorSubject({});
        this.elementsOptions$ = new BehaviorSubject({});
        this.stripe$ = new BehaviorSubject(null);
    }
    /**
     * @param {?} optionsIn
     * @return {?}
     */
    set options(optionsIn) {
        this.options$.next(optionsIn);
    }
    /**
     * @param {?} optionsIn
     * @return {?}
     */
    set elementsOptions(optionsIn) {
        this.elementsOptions$.next(optionsIn);
    }
    /**
     * @param {?} stripeIn
     * @return {?}
     */
    set stripe(stripeIn) {
        this.stripe$.next(stripeIn);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const elements$ = combineLatest(this.elementsOptions$.asObservable(), this.stripe$.asObservable()).pipe(switchMap(([options, stripe]) => {
            if (stripe) {
                if (Object.keys(options).length > 0) {
                    return stripe.elements(options);
                }
                return stripe.elements();
            }
            else {
                if (Object.keys(options).length > 0) {
                    return this.stripeService.elements(options);
                }
                return this.stripeService.elements();
            }
        }));
        combineLatest(elements$, this.options$.asObservable().pipe(filter(options => Boolean(options)))).subscribe(([elements, options]) => {
            this.element = elements.create('card', options);
            this.element.on('blur', ev => this.on.emit({
                event: ev,
                type: 'blur'
            }));
            this.element.on('change', ev => this.on.emit({
                event: ev,
                type: 'change'
            }));
            this.element.on('click', ev => this.on.emit({
                event: ev,
                type: 'click'
            }));
            this.element.on('focus', ev => this.on.emit({
                event: ev,
                type: 'focus'
            }));
            this.element.on('ready', ev => this.on.emit({
                event: ev,
                type: 'ready'
            }));
            this.element.mount(this.stripeCard.nativeElement);
            this.card.emit(this.element);
        });
    }
    /**
     * @return {?}
     */
    getCard() {
        return this.element;
    }
}
StripeCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-stripe-card',
                template: `
    <div class="field" #stripeCard></div>
  `
            }] }
];
/** @nocollapse */
StripeCardComponent.ctorParameters = () => [
    { type: StripeService }
];
StripeCardComponent.propDecorators = {
    card: [{ type: Output }],
    on: [{ type: Output }],
    stripeCard: [{ type: ViewChild, args: ['stripeCard',] }],
    options: [{ type: Input }],
    elementsOptions: [{ type: Input }],
    stripe: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    StripeCardComponent.prototype.card;
    /** @type {?} */
    StripeCardComponent.prototype.on;
    /** @type {?} */
    StripeCardComponent.prototype.stripeCard;
    /** @type {?} */
    StripeCardComponent.prototype.element;
    /** @type {?} */
    StripeCardComponent.prototype.options$;
    /** @type {?} */
    StripeCardComponent.prototype.elementsOptions$;
    /** @type {?} */
    StripeCardComponent.prototype.stripe$;
    /** @type {?} */
    StripeCardComponent.prototype.stripeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXN0cmlwZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3N0cmlwZS1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVFuRSxNQUFNLE9BQU8sbUJBQW1COzs7O0lBd0I5QixZQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZCOUIsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDOztRQUduRCxPQUFFLEdBQUcsSUFBSSxZQUFZLEVBQTBDLENBQUM7UUFRaEUsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUMsQ0FBQztRQUtuRCxxQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBa0IsRUFBRSxDQUFDLENBQUM7UUFLNUQsWUFBTyxHQUFHLElBQUksZUFBZSxDQUF3QixJQUFJLENBQUMsQ0FBQztJQUVoQixDQUFDOzs7OztJQWhCbkQsSUFDVyxPQUFPLENBQUMsU0FBeUI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxJQUNXLGVBQWUsQ0FBQyxTQUEwQjtRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxD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LGFBQWEsQ0FBQyxDQUFDO1lBRWxELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7OztZQXBHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOztHQUVUO2FBQ0Y7Ozs7WUFUUSxhQUFhOzs7bUJBV25CLE1BQU07aUJBRU4sTUFBTTt5QkFHTixTQUFTLFNBQUMsWUFBWTtzQkFFdEIsS0FBSzs4QkFLTCxLQUFLO3FCQUtMLEtBQUs7Ozs7SUFqQk4sbUNBQTBEOztJQUUxRCxpQ0FDdUU7O0lBRXZFLHlDQUF3RDs7SUFDeEQsc0NBQStCOztJQUsvQix1Q0FBMEQ7O0lBSzFELCtDQUFtRTs7SUFLbkUsc0NBQWtFOztJQUV0RCw0Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEVsZW1lbnQgYXMgU3RyaXBlRWxlbWVudCxcbiAgRWxlbWVudE9wdGlvbnMsXG4gIEVsZW1lbnRFdmVudFR5cGVcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lbGVtZW50JztcbmltcG9ydCB7IFN0cmlwZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zdHJpcGUuc2VydmljZSc7XG5pbXBvcnQgeyBFbGVtZW50cywgRWxlbWVudHNPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lbGVtZW50cyc7XG5pbXBvcnQgeyBTdHJpcGVJbnN0YW5jZSB9IGZyb20gJy4uL3NlcnZpY2VzL3N0cmlwZS1pbnN0YW5jZS5jbGFzcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zdHJpcGUtY2FyZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImZpZWxkXCIgI3N0cmlwZUNhcmQ+PC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgU3RyaXBlQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY2FyZCA9IG5ldyBFdmVudEVtaXR0ZXI8U3RyaXBlRWxlbWVudD4oKTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbiA9IG5ldyBFdmVudEVtaXR0ZXI8eyB0eXBlOiBFbGVtZW50RXZlbnRUeXBlOyBldmVudDogYW55IH0+KCk7XG5cbiAgQFZpZXdDaGlsZCgnc3RyaXBlQ2FyZCcpIHB1YmxpYyBzdHJpcGVDYXJkITogRWxlbWVudFJlZjtcbiAgcHVibGljIGVsZW1lbnQhOiBTdHJpcGVFbGVtZW50O1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG9wdGlvbnMob3B0aW9uc0luOiBFbGVtZW50T3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyQubmV4dChvcHRpb25zSW4pO1xuICB9XG4gIHB1YmxpYyBvcHRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RWxlbWVudE9wdGlvbnM+KHt9KTtcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBlbGVtZW50c09wdGlvbnMob3B0aW9uc0luOiBFbGVtZW50c09wdGlvbnMpIHtcbiAgICB0aGlzLmVsZW1lbnRzT3B0aW9ucyQubmV4dChvcHRpb25zSW4pO1xuICB9XG4gIHB1YmxpYyBlbGVtZW50c09wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFbGVtZW50c09wdGlvbnM+KHt9KTtcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzdHJpcGUoc3RyaXBlSW46IFN0cmlwZUluc3RhbmNlKSB7XG4gICAgdGhpcy5zdHJpcGUkLm5leHQoc3RyaXBlSW4pO1xuICB9XG4gIHB1YmxpYyBzdHJpcGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJpcGVJbnN0YW5jZSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdHJpcGVTZXJ2aWNlOiBTdHJpcGVTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBlbGVtZW50cyQ6IE9ic2VydmFibGU8RWxlbWVudHM+ID0gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuZWxlbWVudHNPcHRpb25zJC5hc09ic2VydmFibGUoKSxcbiAgICAgIHRoaXMuc3RyaXBlJC5hc09ic2VydmFibGUoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW29wdGlvbnMsIHN0cmlwZV0pID0+IHtcbiAgICAgICAgaWYgKHN0cmlwZSkge1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyaXBlLmVsZW1lbnRzKG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RyaXBlLmVsZW1lbnRzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmlwZVNlcnZpY2UuZWxlbWVudHMob3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnN0cmlwZVNlcnZpY2UuZWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICBlbGVtZW50cyQsXG4gICAgICB0aGlzLm9wdGlvbnMkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKG9wdGlvbnMgPT4gQm9vbGVhbihvcHRpb25zKSkpXG4gICAgKS5zdWJzY3JpYmUoKFtlbGVtZW50cywgb3B0aW9uc10pID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZSgnY2FyZCcsIG9wdGlvbnMpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQub24oJ2JsdXInLCBldiA9PlxuICAgICAgICB0aGlzLm9uLmVtaXQoe1xuICAgICAgICAgIGV2ZW50OiBldixcbiAgICAgICAgICB0eXBlOiAnYmx1cidcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5vbignY2hhbmdlJywgZXYgPT5cbiAgICAgICAgdGhpcy5vbi5lbWl0KHtcbiAgICAgICAgICBldmVudDogZXYsXG4gICAgICAgICAgdHlwZTogJ2NoYW5nZSdcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5vbignY2xpY2snLCBldiA9PlxuICAgICAgICB0aGlzLm9uLmVtaXQoe1xuICAgICAgICAgIGV2ZW50OiBldixcbiAgICAgICAgICB0eXBlOiAnY2xpY2snXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLmVsZW1lbnQub24oJ2ZvY3VzJywgZXYgPT5cbiAgICAgICAgdGhpcy5vbi5lbWl0KHtcbiAgICAgICAgICBldmVudDogZXYsXG4gICAgICAgICAgdHlwZTogJ2ZvY3VzJ1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5lbGVtZW50Lm9uKCdyZWFkeScsIGV2ID0+XG4gICAgICAgIHRoaXMub24uZW1pdCh7XG4gICAgICAgICAgZXZlbnQ6IGV2LFxuICAgICAgICAgIHR5cGU6ICdyZWFkeSdcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5tb3VudCh0aGlzLnN0cmlwZUNhcmQubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIHRoaXMuY2FyZC5lbWl0KHRoaXMuZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FyZCgpOiBTdHJpcGVFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9XG59XG4iXX0=