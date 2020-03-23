var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var BadgeOriginal = /** @class */ (function (_super) {
    __extends(BadgeOriginal, _super);
    function BadgeOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BadgeOriginal.prototype.clear = function () { return cordova(this, "clear", {}, arguments); };
    BadgeOriginal.prototype.set = function (badgeNumber) { return cordova(this, "set", {}, arguments); };
    BadgeOriginal.prototype.get = function () { return cordova(this, "get", {}, arguments); };
    BadgeOriginal.prototype.increase = function (increaseBy) { return cordova(this, "increase", {}, arguments); };
    BadgeOriginal.prototype.decrease = function (decreaseBy) { return cordova(this, "decrease", {}, arguments); };
    BadgeOriginal.prototype.isSupported = function () { return cordova(this, "isSupported", {}, arguments); };
    BadgeOriginal.prototype.hasPermission = function () { return cordova(this, "hasPermission", {}, arguments); };
    BadgeOriginal.prototype.requestPermission = function () { return cordova(this, "requestPermission", {}, arguments); };
    BadgeOriginal.pluginName = "Badge";
    BadgeOriginal.plugin = "cordova-plugin-badge";
    BadgeOriginal.pluginRef = "cordova.plugins.notification.badge";
    BadgeOriginal.repo = "https://github.com/katzer/cordova-plugin-badge";
    BadgeOriginal.platforms = ["Android", "Browser", "iOS", "Windows"];
    return BadgeOriginal;
}(IonicNativePlugin));
var Badge = new BadgeOriginal();
export { Badge };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2JhZGdlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztJQThCN0MseUJBQWlCOzs7O0lBTTFDLHFCQUFLO0lBVUwsbUJBQUcsYUFBQyxXQUFtQjtJQVN2QixtQkFBRztJQVVILHdCQUFRLGFBQUMsVUFBa0I7SUFVM0Isd0JBQVEsYUFBQyxVQUFrQjtJQVMzQiwyQkFBVztJQVNYLDZCQUFhO0lBU2IsaUNBQWlCOzs7Ozs7Z0JBdkduQjtFQStCMkIsaUJBQWlCO1NBQS9CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuLyoqXG4gKiBAbmFtZSBCYWRnZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgZXNzZW50aWFsIHB1cnBvc2Ugb2YgYmFkZ2UgbnVtYmVycyBpcyB0byBlbmFibGUgYW4gYXBwbGljYXRpb24gdG8gaW5mb3JtIGl0cyB1c2VycyB0aGF0IGl0IGhhcyBzb21ldGhpbmcgZm9yIHRoZW0g4oCUIGZvciBleGFtcGxlLCB1bnJlYWQgbWVzc2FnZXMg4oCUIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzbuKAmXQgcnVubmluZyBpbiB0aGUgZm9yZWdyb3VuZC5cbiAqXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogY29yZG92YS1wbHVnaW4tYmFkZ2UuIEZvciBtb3JlIGluZm8sIHBsZWFzZSBzZWUgdGhlIFtCYWRnZSBwbHVnaW4gZG9jc10oaHR0cHM6Ly9naXRodWIuY29tL2thdHplci9jb3Jkb3ZhLXBsdWdpbi1iYWRnZSkuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBCYWRnZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvYmFkZ2Uvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhZGdlOiBCYWRnZSkgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5iYWRnZS5zZXQoMTApO1xuICogdGhpcy5iYWRnZS5pbmNyZWFzZSgxKTtcbiAqIHRoaXMuYmFkZ2UuY2xlYXIoKTtcbiAqIGBgYFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0JhZGdlJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tYmFkZ2UnLFxuICBwbHVnaW5SZWY6ICdjb3Jkb3ZhLnBsdWdpbnMubm90aWZpY2F0aW9uLmJhZGdlJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9rYXR6ZXIvY29yZG92YS1wbHVnaW4tYmFkZ2UnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdXaW5kb3dzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFkZ2UgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBDbGVhciB0aGUgYmFkZ2Ugb2YgdGhlIGFwcCBpY29uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgY2xlYXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYmFkZ2Ugb2YgdGhlIGFwcCBpY29uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYmFkZ2VOdW1iZXIgIFRoZSBuZXcgYmFkZ2UgbnVtYmVyLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBzZXQoYmFkZ2VOdW1iZXI6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYmFkZ2Ugb2YgdGhlIGFwcCBpY29uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2UgdGhlIGJhZGdlIG51bWJlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluY3JlYXNlQnkgIENvdW50IHRvIGFkZCB0byB0aGUgY3VycmVudCBiYWRnZSBudW1iZXJcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgaW5jcmVhc2UoaW5jcmVhc2VCeTogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2UgdGhlIGJhZGdlIG51bWJlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGRlY3JlYXNlQnkgIENvdW50IHRvIHN1YnRyYWN0IGZyb20gdGhlIGN1cnJlbnQgYmFkZ2UgbnVtYmVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGRlY3JlYXNlKGRlY3JlYXNlQnk6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHN1cHBvcnQgdG8gc2hvdyBiYWRnZXMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGlzU3VwcG9ydGVkKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBpZiB0aGUgYXBwIGhhcyBwZXJtaXNzaW9uIHRvIHNob3cgYmFkZ2VzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBoYXNQZXJtaXNzaW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHBlcm1pc3Npb24gdG8gc2V0IGJhZGdlIG5vdGlmaWNhdGlvbnNcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcmVxdWVzdFBlcm1pc3Npb24oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==