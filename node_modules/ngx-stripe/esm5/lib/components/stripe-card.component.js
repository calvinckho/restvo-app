/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { StripeService } from '../services/stripe.service';
import { StripeInstance } from '../services/stripe-instance.class';
var StripeCardComponent = /** @class */ (function () {
    function StripeCardComponent(stripeService) {
        this.stripeService = stripeService;
        this.card = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
        this.on = new EventEmitter();
        this.options$ = new BehaviorSubject({});
        this.elementsOptions$ = new BehaviorSubject({});
        this.stripe$ = new BehaviorSubject(null);
    }
    Object.defineProperty(StripeCardComponent.prototype, "options", {
        set: /**
         * @param {?} optionsIn
         * @return {?}
         */
        function (optionsIn) {
            this.options$.next(optionsIn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StripeCardComponent.prototype, "elementsOptions", {
        set: /**
         * @param {?} optionsIn
         * @return {?}
         */
        function (optionsIn) {
            this.elementsOptions$.next(optionsIn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StripeCardComponent.prototype, "stripe", {
        set: /**
         * @param {?} stripeIn
         * @return {?}
         */
        function (stripeIn) {
            this.stripe$.next(stripeIn);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StripeCardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var elements$ = combineLatest(this.elementsOptions$.asObservable(), this.stripe$.asObservable()).pipe(switchMap(function (_a) {
            var _b = tslib_1.__read(_a, 2), options = _b[0], stripe = _b[1];
            if (stripe) {
                if (Object.keys(options).length > 0) {
                    return stripe.elements(options);
                }
                return stripe.elements();
            }
            else {
                if (Object.keys(options).length > 0) {
                    return _this.stripeService.elements(options);
                }
                return _this.stripeService.elements();
            }
        }));
        combineLatest(elements$, this.options$.asObservable().pipe(filter(function (options) { return Boolean(options); }))).subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 2), elements = _b[0], options = _b[1];
            _this.element = elements.create('card', options);
            _this.element.on('blur', function (ev) {
                return _this.on.emit({
                    event: ev,
                    type: 'blur'
                });
            });
            _this.element.on('change', function (ev) {
                return _this.on.emit({
                    event: ev,
                    type: 'change'
                });
            });
            _this.element.on('click', function (ev) {
                return _this.on.emit({
                    event: ev,
                    type: 'click'
                });
            });
            _this.element.on('focus', function (ev) {
                return _this.on.emit({
                    event: ev,
                    type: 'focus'
                });
            });
            _this.element.on('ready', function (ev) {
                return _this.on.emit({
                    event: ev,
                    type: 'ready'
                });
            });
            _this.element.mount(_this.stripeCard.nativeElement);
            _this.card.emit(_this.element);
        });
    };
    /**
     * @return {?}
     */
    StripeCardComponent.prototype.getCard = /**
     * @return {?}
     */
    function () {
        return this.element;
    };
    StripeCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-stripe-card',
                    template: "\n    <div class=\"field\" #stripeCard></div>\n  "
                }] }
    ];
    /** @nocollapse */
    StripeCardComponent.ctorParameters = function () { return [
        { type: StripeService }
    ]; };
    StripeCardComponent.propDecorators = {
        card: [{ type: Output }],
        on: [{ type: Output }],
        stripeCard: [{ type: ViewChild, args: ['stripeCard',] }],
        options: [{ type: Input }],
        elementsOptions: [{ type: Input }],
        stripe: [{ type: Input }]
    };
    return StripeCardComponent;
}());
export { StripeCardComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXN0cmlwZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3N0cmlwZS1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbkU7SUE4QkUsNkJBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdkI5QixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7O1FBR25ELE9BQUUsR0FBRyxJQUFJLFlBQVksRUFBMEMsQ0FBQztRQVFoRSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBS25ELHFCQUFnQixHQUFHLElBQUksZUFBZSxDQUFrQixFQUFFLENBQUMsQ0FBQztRQUs1RCxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQXdCLElBQUksQ0FBQyxDQUFDO0lBRWhCLENBQUM7SUFoQm5ELHNCQUNXLHdDQUFPOzs7OztRQURsQixVQUNtQixTQUF5QjtZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUNXLGdEQUFlOzs7OztRQUQxQixVQUMyQixTQUEwQjtZQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMs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QUksQ0FBQztvQkFDWCxLQUFLLEVBQUUsRUFBRTtvQkFDVCxJQUFJLEVBQUUsT0FBTztpQkFDZCxDQUFDO1lBSEYsQ0FHRSxDQUNILENBQUM7WUFFRixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRWxELEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFTSxxQ0FBTzs7O0lBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Z0JBcEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsbURBRVQ7aUJBQ0Y7Ozs7Z0JBVFEsYUFBYTs7O3VCQVduQixNQUFNO3FCQUVOLE1BQU07NkJBR04sU0FBUyxTQUFDLFlBQVk7MEJBRXRCLEtBQUs7a0NBS0wsS0FBSzt5QkFLTCxLQUFLOztJQTZFUiwwQkFBQztDQUFBLEFBckdELElBcUdDO1NBL0ZZLG1CQUFtQjs7O0lBQzlCLG1DQUEwRDs7SUFFMUQsaUNBQ3VFOztJQUV2RSx5Q0FBd0Q7O0lBQ3hELHNDQUErQjs7SUFLL0IsdUNBQTBEOztJQUsxRCwrQ0FBbUU7O0lBS25FLHNDQUFrRTs7SUFFdEQsNENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBFbGVtZW50IGFzIFN0cmlwZUVsZW1lbnQsXG4gIEVsZW1lbnRPcHRpb25zLFxuICBFbGVtZW50RXZlbnRUeXBlXG59IGZyb20gJy4uL2ludGVyZmFjZXMvZWxlbWVudCc7XG5pbXBvcnQgeyBTdHJpcGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc3RyaXBlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRWxlbWVudHMsIEVsZW1lbnRzT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvZWxlbWVudHMnO1xuaW1wb3J0IHsgU3RyaXBlSW5zdGFuY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zdHJpcGUtaW5zdGFuY2UuY2xhc3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc3RyaXBlLWNhcmQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiICNzdHJpcGVDYXJkPjwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFN0cmlwZUNhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgcHVibGljIGNhcmQgPSBuZXcgRXZlbnRFbWl0dGVyPFN0cmlwZUVsZW1lbnQ+KCk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb24gPSBuZXcgRXZlbnRFbWl0dGVyPHsgdHlwZTogRWxlbWVudEV2ZW50VHlwZTsgZXZlbnQ6IGFueSB9PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0cmlwZUNhcmQnKSBwdWJsaWMgc3RyaXBlQ2FyZCE6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyBlbGVtZW50ITogU3RyaXBlRWxlbWVudDtcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnNJbjogRWxlbWVudE9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMkLm5leHQob3B0aW9uc0luKTtcbiAgfVxuICBwdWJsaWMgb3B0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVsZW1lbnRPcHRpb25zPih7fSk7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZWxlbWVudHNPcHRpb25zKG9wdGlvbnNJbjogRWxlbWVudHNPcHRpb25zKSB7XG4gICAgdGhpcy5lbGVtZW50c09wdGlvbnMkLm5leHQob3B0aW9uc0luKTtcbiAgfVxuICBwdWJsaWMgZWxlbWVudHNPcHRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RWxlbWVudHNPcHRpb25zPih7fSk7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc3RyaXBlKHN0cmlwZUluOiBTdHJpcGVJbnN0YW5jZSkge1xuICAgIHRoaXMuc3RyaXBlJC5uZXh0KHN0cmlwZUluKTtcbiAgfVxuICBwdWJsaWMgc3RyaXBlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyaXBlSW5zdGFuY2UgfCBudWxsPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RyaXBlU2VydmljZTogU3RyaXBlU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgZWxlbWVudHMkOiBPYnNlcnZhYmxlPEVsZW1lbnRzPiA9IGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmVsZW1lbnRzT3B0aW9ucyQuYXNPYnNlcnZhYmxlKCksXG4gICAgICB0aGlzLnN0cmlwZSQuYXNPYnNlcnZhYmxlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtvcHRpb25zLCBzdHJpcGVdKSA9PiB7XG4gICAgICAgIGlmIChzdHJpcGUpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmlwZS5lbGVtZW50cyhvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cmlwZS5lbGVtZW50cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcGVTZXJ2aWNlLmVsZW1lbnRzKG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcGVTZXJ2aWNlLmVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgZWxlbWVudHMkLFxuICAgICAgdGhpcy5vcHRpb25zJC5hc09ic2VydmFibGUoKS5waXBlKGZpbHRlcihvcHRpb25zID0+IEJvb2xlYW4ob3B0aW9ucykpKVxuICAgICkuc3Vic2NyaWJlKChbZWxlbWVudHMsIG9wdGlvbnNdKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50cy5jcmVhdGUoJ2NhcmQnLCBvcHRpb25zKTtcblxuICAgICAgdGhpcy5lbGVtZW50Lm9uKCdibHVyJywgZXYgPT5cbiAgICAgICAgdGhpcy5vbi5lbWl0KHtcbiAgICAgICAgICBldmVudDogZXYsXG4gICAgICAgICAgdHlwZTogJ2JsdXInXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLmVsZW1lbnQub24oJ2NoYW5nZScsIGV2ID0+XG4gICAgICAgIHRoaXMub24uZW1pdCh7XG4gICAgICAgICAgZXZlbnQ6IGV2LFxuICAgICAgICAgIHR5cGU6ICdjaGFuZ2UnXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLmVsZW1lbnQub24oJ2NsaWNrJywgZXYgPT5cbiAgICAgICAgdGhpcy5vbi5lbWl0KHtcbiAgICAgICAgICBldmVudDogZXYsXG4gICAgICAgICAgdHlwZTogJ2NsaWNrJ1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5lbGVtZW50Lm9uKCdmb2N1cycsIGV2ID0+XG4gICAgICAgIHRoaXMub24uZW1pdCh7XG4gICAgICAgICAgZXZlbnQ6IGV2LFxuICAgICAgICAgIHR5cGU6ICdmb2N1cydcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5vbigncmVhZHknLCBldiA9PlxuICAgICAgICB0aGlzLm9uLmVtaXQoe1xuICAgICAgICAgIGV2ZW50OiBldixcbiAgICAgICAgICB0eXBlOiAncmVhZHknXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLmVsZW1lbnQubW91bnQodGhpcy5zdHJpcGVDYXJkLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICB0aGlzLmNhcmQuZW1pdCh0aGlzLmVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENhcmQoKTogU3RyaXBlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfVxufVxuIl19