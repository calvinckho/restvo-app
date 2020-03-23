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
var SMSOriginal = /** @class */ (function (_super) {
    __extends(SMSOriginal, _super);
    function SMSOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SMSOriginal.prototype.send = function (phoneNumber, message, options) { return cordova(this, "send", { "successIndex": 3, "errorIndex": 4 }, arguments); };
    SMSOriginal.prototype.hasPermission = function () { return cordova(this, "hasPermission", { "platforms": ["Android"] }, arguments); };
    SMSOriginal.pluginName = "SMS";
    SMSOriginal.plugin = "cordova-sms-plugin";
    SMSOriginal.pluginRef = "sms";
    SMSOriginal.repo = "https://github.com/cordova-sms/cordova-sms-plugin";
    SMSOriginal.platforms = ["Android", "iOS", "Windows", "Windows Phone 8"];
    return SMSOriginal;
}(IonicNativePlugin));
var SMS = new SMSOriginal();
export { SMS };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3Ntcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUFvRC9DLHVCQUFpQjs7OztJQVl4QyxrQkFBSSxhQUNGLFdBQThCLEVBQzlCLE9BQWUsRUFDZixPQUFvQjtJQVl0QiwyQkFBYTs7Ozs7O2NBaEZmO0VBcUR5QixpQkFBaUI7U0FBN0IsR0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHNlbmRpbmcgYW4gU01TXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU21zT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTZXQgdG8gdHJ1ZSB0byByZXBsYWNlIFxcbiBieSBhIG5ldyBsaW5lLiBEZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcmVwbGFjZUxpbmVCcmVha3M/OiBib29sZWFuO1xuXG4gIGFuZHJvaWQ/OiBTbXNPcHRpb25zQW5kcm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbXNPcHRpb25zQW5kcm9pZCB7XG4gIC8qKlxuICAgKiBTZXQgdG8gXCJJTlRFTlRcIiB0byBzZW5kIFNNUyB3aXRoIHRoZSBuYXRpdmUgYW5kcm9pZCBTTVMgbWVzc2FnaW5nLiBMZWF2aW5nIGl0IGVtcHR5IHdpbGwgc2VuZCB0aGUgU01TIHdpdGhvdXQgb3BlbmluZyBhbnkgYXBwLlxuICAgKi9cbiAgaW50ZW50Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBuYW1lIFNNU1xuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVxdWlyZXMgQ29yZG92YSBwbHVnaW46IGNvcmRvdmEtc21zLXBsdWdpbi4gRm9yIG1vcmUgaW5mbywgcGxlYXNlIHNlZSB0aGUgW1NNUyBwbHVnaW4gZG9jc10oaHR0cHM6Ly9naXRodWIuY29tL2NvcmRvdmEtc21zL2NvcmRvdmEtc21zLXBsdWdpbikuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBTTVMgfSBmcm9tICdAaW9uaWMtbmF0aXZlL3Ntcy9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgc21zOiBTTVMpIHsgfVxuICpcbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogLy8gU2VuZCBhIHRleHQgbWVzc2FnZSB1c2luZyBkZWZhdWx0IG9wdGlvbnNcbiAqIHRoaXMuc21zLnNlbmQoJzQxNjEyMzQ1NicsICdIZWxsbyB3b3JsZCEnKTtcbiAqIGBgYFxuICogQGludGVyZmFjZXNcbiAqIFNtc09wdGlvbnNcbiAqIFNtc09wdGlvbnNBbmRyb2lkXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnU01TJyxcbiAgcGx1Z2luOiAnY29yZG92YS1zbXMtcGx1Z2luJyxcbiAgcGx1Z2luUmVmOiAnc21zJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9jb3Jkb3ZhLXNtcy9jb3Jkb3ZhLXNtcy1wbHVnaW4nLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnLCAnV2luZG93cycsICdXaW5kb3dzIFBob25lIDgnXVxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTTVMgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBTZW5kcyBzbXMgdG8gYSBudW1iZXJcbiAgICogQHBhcmFtIHBob25lTnVtYmVyIHtzdHJpbmd8c3RyaW5nW119IFBob25lIG51bWJlclxuICAgKiBAcGFyYW0gbWVzc2FnZSB7c3RyaW5nfSBNZXNzYWdlXG4gICAqIEBwYXJhbSBvcHRpb25zIHtTbXNPcHRpb25zfSBPcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJlc29sdmVzIHByb21pc2Ugd2hlbiB0aGUgU01TIGhhcyBiZWVuIHNlbnRcbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzdWNjZXNzSW5kZXg6IDMsXG4gICAgZXJyb3JJbmRleDogNFxuICB9KVxuICBzZW5kKFxuICAgIHBob25lTnVtYmVyOiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFNtc09wdGlvbnNcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBsZXRzIHlvdSBrbm93IGlmIHRoZSBhcHAgaGFzIHBlcm1pc3Npb24gdG8gc2VuZCBTTVNcbiAgICogQHJldHVybiB7UHJvbWlzZTxib29sZWFuPn0gcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiB3ZSBoYXZlIHBlcm1pc3Npb25cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddXG4gIH0pXG4gIGhhc1Blcm1pc3Npb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=