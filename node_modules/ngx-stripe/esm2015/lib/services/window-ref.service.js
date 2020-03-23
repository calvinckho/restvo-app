/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class WindowRef {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    getNativeWindow() {
        if (isPlatformBrowser(this.platformId)) {
            return window;
        }
        return (/** @type {?} */ ({}));
    }
}
WindowRef.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WindowRef.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /** @type {?} */
    WindowRef.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXN0cmlwZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdwRCxNQUFNLE9BQU8sU0FBUzs7OztJQUNwQixZQUF3QyxVQUFlO1FBQWYsZUFBVSxHQUFWLFVBQVUsQ0FBSztJQUFHLENBQUM7Ozs7SUFFcEQsZUFBZTtRQUNwQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsT0FBTyxtQkFBQSxFQUFFLEVBQVUsQ0FBQztJQUN0QixDQUFDOzs7WUFURixVQUFVOzs7OzRDQUVJLE1BQU0sU0FBQyxXQUFXOzs7O0lBQW5CLCtCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpbmRvd1JlZiB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHB1YmxpYyBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgcHVibGljIGdldE5hdGl2ZVdpbmRvdygpOiBXaW5kb3cge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICByZXR1cm4ge30gYXMgV2luZG93O1xuICB9XG59XG4iXX0=