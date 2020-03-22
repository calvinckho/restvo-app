/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class DocumentRef {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    getNativeDocument() {
        if (isPlatformBrowser(this.platformId)) {
            return document;
        }
        return (/** @type {?} */ ({}));
    }
}
DocumentRef.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DocumentRef.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /** @type {?} */
    DocumentRef.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc3RyaXBlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHcEQsTUFBTSxPQUFPLFdBQVc7Ozs7SUFDdEIsWUFBd0MsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7SUFBRyxDQUFDOzs7O0lBRXBELGlCQUFpQjtRQUN0QixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELE9BQU8sbUJBQUEsRUFBRSxFQUFZLENBQUM7SUFDeEIsQ0FBQzs7O1lBVEYsVUFBVTs7Ozs0Q0FFSSxNQUFNLFNBQUMsV0FBVzs7OztJQUFuQixpQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb2N1bWVudFJlZiB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHB1YmxpYyBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgcHVibGljIGdldE5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH1cbiAgICByZXR1cm4ge30gYXMgRG9jdW1lbnQ7XG4gIH1cbn1cbiJdfQ==