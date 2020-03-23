/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var DocumentRef = /** @class */ (function () {
    function DocumentRef(platformId) {
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    DocumentRef.prototype.getNativeDocument = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            return document;
        }
        return (/** @type {?} */ ({}));
    };
    DocumentRef.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DocumentRef.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return DocumentRef;
}());
export { DocumentRef };
if (false) {
    /** @type {?} */
    DocumentRef.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc3RyaXBlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQ7SUFFRSxxQkFBd0MsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7SUFBRyxDQUFDOzs7O0lBRXBELHVDQUFpQjs7O0lBQXhCO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFDRCxPQUFPLG1CQUFBLEVBQUUsRUFBWSxDQUFDO0lBQ3hCLENBQUM7O2dCQVRGLFVBQVU7Ozs7Z0RBRUksTUFBTSxTQUFDLFdBQVc7O0lBUWpDLGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVFksV0FBVzs7O0lBQ1YsaUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRSZWYge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogYW55KSB7fVxuXG4gIHB1YmxpYyBnZXROYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHt9IGFzIERvY3VtZW50O1xuICB9XG59XG4iXX0=