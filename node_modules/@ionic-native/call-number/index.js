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
var CallNumberOriginal = /** @class */ (function (_super) {
    __extends(CallNumberOriginal, _super);
    function CallNumberOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallNumberOriginal.prototype.callNumber = function (numberToCall, bypassAppChooser) { return cordova(this, "callNumber", { "callbackOrder": "reverse" }, arguments); };
    CallNumberOriginal.prototype.isCallSupported = function () { return cordova(this, "isCallSupported", {}, arguments); };
    CallNumberOriginal.pluginName = "CallNumber";
    CallNumberOriginal.plugin = "call-number";
    CallNumberOriginal.pluginRef = "plugins.CallNumber";
    CallNumberOriginal.repo = "https://github.com/Rohfosho/CordovaCallNumberPlugin";
    CallNumberOriginal.platforms = ["Android", "iOS"];
    return CallNumberOriginal;
}(IonicNativePlugin));
var CallNumber = new CallNumberOriginal();
export { CallNumber };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2NhbGwtbnVtYmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztJQStCeEMsOEJBQWlCOzs7O0lBVS9DLCtCQUFVLGFBQUMsWUFBb0IsRUFBRSxnQkFBeUI7SUFTMUQsb0NBQWU7Ozs7OztxQkFuRGpCO0VBZ0NnQyxpQkFBaUI7U0FBcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG4vKipcbiAqIEBuYW1lIENhbGwgTnVtYmVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIENhbGwgYSBudW1iZXIgZGlyZWN0bHkgZnJvbSB5b3VyIENvcmRvdmEvSW9uaWMgYXBwbGljYXRpb24uXG4gKiAqKk5PVEUqKjogVGhlIGlPUyBTaW11bGF0b3IgKGFuZCBtYXliZSBBbmRyb2lkIFNpbXVsYXRvcnMpIGRvIG5vdCBwcm92aWRlIGFjY2VzcyB0byB0aGUgcGhvbmUgc3Vic3lzdGVtLlxuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ2FsbE51bWJlciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY2FsbC1udW1iZXIvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGxOdW1iZXI6IENhbGxOdW1iZXIpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqXG4gKiB0aGlzLmNhbGxOdW1iZXIuY2FsbE51bWJlcihcIjE4MDAxMDEwMTAxXCIsIHRydWUpXG4gKiAgIC50aGVuKHJlcyA9PiBjb25zb2xlLmxvZygnTGF1bmNoZWQgZGlhbGVyIScsIHJlcykpXG4gKiAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ0Vycm9yIGxhdW5jaGluZyBkaWFsZXInLCBlcnIpKTtcbiAqXG4gKiBgYGBcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdDYWxsTnVtYmVyJyxcbiAgcGx1Z2luOiAnY2FsbC1udW1iZXInLFxuICBwbHVnaW5SZWY6ICdwbHVnaW5zLkNhbGxOdW1iZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL1JvaGZvc2hvL0NvcmRvdmFDYWxsTnVtYmVyUGx1Z2luJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FsbE51bWJlciBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIENhbGxzIGEgcGhvbmUgbnVtYmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBudW1iZXJUb0NhbGwgVGhlIHBob25lIG51bWJlciB0byBjYWxsIGFzIGEgc3RyaW5nXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYnlwYXNzQXBwQ2hvb3NlciBTZXQgdG8gdHJ1ZSB0byBieXBhc3MgdGhlIGFwcCBjaG9vc2VyIGFuZCBnbyBkaXJlY3RseSB0byBkaWFsZXJcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrT3JkZXI6ICdyZXZlcnNlJ1xuICB9KVxuICBjYWxsTnVtYmVyKG51bWJlclRvQ2FsbDogc3RyaW5nLCBieXBhc3NBcHBDaG9vc2VyOiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgY2FsbCBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGlzQ2FsbFN1cHBvcnRlZCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19