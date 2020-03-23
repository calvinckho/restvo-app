/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var WindowRef = /** @class */ (function () {
    function WindowRef(platformId) {
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    WindowRef.prototype.getNativeWindow = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            return window;
        }
        return (/** @type {?} */ ({}));
    };
    WindowRef.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WindowRef.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return WindowRef;
}());
export { WindowRef };
if (false) {
    /** @type {?} */
    WindowRef.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXN0cmlwZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRDtJQUVFLG1CQUF3QyxVQUFlO1FBQWYsZUFBVSxHQUFWLFVBQVUsQ0FBSztJQUFHLENBQUM7Ozs7SUFFcEQsbUNBQWU7OztJQUF0QjtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLG1CQUFBLEVBQUUsRUFBVSxDQUFDO0lBQ3RCLENBQUM7O2dCQVRGLFVBQVU7Ozs7Z0RBRUksTUFBTSxTQUFDLFdBQVc7O0lBUWpDLGdCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVFksU0FBUzs7O0lBQ1IsK0JBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2luZG93UmVmIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IGFueSkge31cblxuICBwdWJsaWMgZ2V0TmF0aXZlV2luZG93KCk6IFdpbmRvdyB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBXaW5kb3c7XG4gIH1cbn1cbiJdfQ==