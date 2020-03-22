/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY } from '../interfaces/stripe';
import { LazyStripeAPILoader } from './api-loader.service';
import { WindowRef } from './window-ref.service';
import { StripeInstance } from './stripe-instance.class';
var StripeFactoryService = /** @class */ (function () {
    function StripeFactoryService(baseKey, baseOptions, loader, window) {
        this.baseKey = baseKey;
        this.baseOptions = baseOptions;
        this.loader = loader;
        this.window = window;
    }
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    StripeFactoryService.prototype.create = /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    function (key, options) {
        return new StripeInstance(this.loader, this.window, key, options);
    };
    StripeFactoryService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StripeFactoryService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
        { type: String, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] },
        { type: LazyStripeAPILoader },
        { type: WindowRef }
    ]; };
    return StripeFactoryService;
}());
export { StripeFactoryService };
if (false) {
    /** @type {?} */
    StripeFactoryService.prototype.baseKey;
    /** @type {?} */
    StripeFactoryService.prototype.baseOptions;
    /** @type {?} */
    StripeFactoryService.prototype.loader;
    /** @type {?} */
    StripeFactoryService.prototype.window;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWZhY3Rvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zdHJpcGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvc3RyaXBlLWZhY3Rvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxzQkFBc0IsRUFDdkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpEO0lBRUUsOEJBQ3lDLE9BQWUsRUFDdkIsV0FBbUIsRUFDM0MsTUFBMkIsRUFDM0IsTUFBaUI7UUFIZSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ3ZCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQzNDLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDdkIsQ0FBQzs7Ozs7O0lBRUcscUNBQU07Ozs7O0lBQWIsVUFBYyxHQUFXLEVBQUUsT0FBaUI7UUFDMUMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O2dCQVhGLFVBQVU7Ozs7NkNBR04sTUFBTSxTQUFDLHNCQUFzQjs2Q0FDN0IsTUFBTSxTQUFDLGNBQWM7Z0JBUmpCLG1CQUFtQjtnQkFDbkIsU0FBUzs7SUFlbEIsMkJBQUM7Q0FBQSxBQVpELElBWUM7U0FYWSxvQkFBb0I7OztJQUU3Qix1Q0FBc0Q7O0lBQ3RELDJDQUFrRDs7SUFDbEQsc0NBQWtDOztJQUNsQyxzQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgT3B0aW9ucyxcbiAgU1RSSVBFX09QVElPTlMsXG4gIFNUUklQRV9QVUJMSVNIQUJMRV9LRVlcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zdHJpcGUnO1xuaW1wb3J0IHsgTGF6eVN0cmlwZUFQSUxvYWRlciB9IGZyb20gJy4vYXBpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmlwZUluc3RhbmNlIH0gZnJvbSAnLi9zdHJpcGUtaW5zdGFuY2UuY2xhc3MnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RyaXBlRmFjdG9yeVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFNUUklQRV9QVUJMSVNIQUJMRV9LRVkpIHB1YmxpYyBiYXNlS2V5OiBzdHJpbmcsXG4gICAgQEluamVjdChTVFJJUEVfT1BUSU9OUykgcHVibGljIGJhc2VPcHRpb25zOiBzdHJpbmcsXG4gICAgcHVibGljIGxvYWRlcjogTGF6eVN0cmlwZUFQSUxvYWRlcixcbiAgICBwdWJsaWMgd2luZG93OiBXaW5kb3dSZWZcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGUoa2V5OiBzdHJpbmcsIG9wdGlvbnM/OiBPcHRpb25zKTogU3RyaXBlSW5zdGFuY2Uge1xuICAgIHJldHVybiBuZXcgU3RyaXBlSW5zdGFuY2UodGhpcy5sb2FkZXIsIHRoaXMud2luZG93LCBrZXksIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=