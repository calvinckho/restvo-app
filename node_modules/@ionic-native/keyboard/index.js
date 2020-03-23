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
import { IonicNativePlugin, cordova, cordovaPropertyGet, cordovaPropertySet } from '@ionic-native/core';
import { Observable } from 'rxjs';
export var KeyboardStyle;
(function (KeyboardStyle) {
    KeyboardStyle["Light"] = "light";
    KeyboardStyle["Dark"] = "dark";
})(KeyboardStyle || (KeyboardStyle = {}));
export var KeyboardResizeMode;
(function (KeyboardResizeMode) {
    KeyboardResizeMode["Native"] = "native";
    KeyboardResizeMode["Ionic"] = "ionic";
    KeyboardResizeMode["Body"] = "body";
    KeyboardResizeMode["None"] = "none";
})(KeyboardResizeMode || (KeyboardResizeMode = {}));
var KeyboardOriginal = /** @class */ (function (_super) {
    __extends(KeyboardOriginal, _super);
    function KeyboardOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardOriginal.prototype.hideFormAccessoryBar = function (hide) { return cordova(this, "hideFormAccessoryBar", { "sync": true, "platforms": ["iOS"] }, arguments); };
    KeyboardOriginal.prototype.hide = function () { return cordova(this, "hide", { "sync": true, "platforms": ["iOS", "Android"] }, arguments); };
    KeyboardOriginal.prototype.show = function () { return cordova(this, "show", { "sync": true, "platforms": ["Android"] }, arguments); };
    KeyboardOriginal.prototype.setResizeMode = function (mode) { return cordova(this, "setResizeMode", { "sync": true, "platforms": ["iOS"] }, arguments); };
    KeyboardOriginal.prototype.setKeyboardStyle = function (style) { return cordova(this, "setKeyboardStyle", { "sync": true, "platforms": ["iOS"] }, arguments); };
    KeyboardOriginal.prototype.disableScroll = function (disable) { return cordova(this, "disableScroll", { "sync": true, "platforms": ["iOS"] }, arguments); };
    KeyboardOriginal.prototype.onKeyboardShow = function () { return cordova(this, "onKeyboardShow", { "eventObservable": true, "event": "native.keyboardshow", "platforms": ["iOS", "Android"] }, arguments); };
    KeyboardOriginal.prototype.onKeyboardWillShow = function () { return cordova(this, "onKeyboardWillShow", { "eventObservable": true, "event": "keyboardWillShow", "platforms": ["iOS", "Android"] }, arguments); };
    KeyboardOriginal.prototype.onKeyboardDidShow = function () { return cordova(this, "onKeyboardDidShow", { "eventObservable": true, "event": "keyboardDidShow", "platforms": ["iOS", "Android"] }, arguments); };
    KeyboardOriginal.prototype.onKeyboardHide = function () { return cordova(this, "onKeyboardHide", { "eventObservable": true, "event": "native.keyboardhide", "platforms": ["iOS", "Android"] }, arguments); };
    KeyboardOriginal.prototype.onKeyboardWillHide = function () { return cordova(this, "onKeyboardWillHide", { "eventObservable": true, "event": "keyboardWillHide", "platforms": ["iOS", "Android"] }, arguments); };
    KeyboardOriginal.prototype.onKeyboardDidHide = function () { return cordova(this, "onKeyboardDidHide", { "eventObservable": true, "event": "keyboardDidHide", "platforms": ["iOS", "Android"] }, arguments); };
    Object.defineProperty(KeyboardOriginal.prototype, "isVisible", {
        get: function () { return cordovaPropertyGet(this, "isVisible"); },
        set: function (value) { cordovaPropertySet(this, "isVisible", value); },
        enumerable: true,
        configurable: true
    });
    KeyboardOriginal.pluginName = "Keyboard";
    KeyboardOriginal.plugin = "cordova-plugin-ionic-keyboard";
    KeyboardOriginal.pluginRef = "window.Keyboard";
    KeyboardOriginal.repo = "https://github.com/ionic-team/cordova-plugin-ionic-keyboard";
    KeyboardOriginal.platforms = ["Android", "iOS"];
    return KeyboardOriginal;
}(IonicNativePlugin));
var Keyboard = new KeyboardOriginal();
export { Keyboard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2tleWJvYXJkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLHNFQUF1RCxNQUFNLG9CQUFvQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixnQ0FBZSxDQUFBO0lBQ2YsOEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQUVELE1BQU0sQ0FBTixJQUFZLGtCQUtYO0FBTEQsV0FBWSxrQkFBa0I7SUFDNUIsdUNBQWlCLENBQUE7SUFDakIscUNBQWUsQ0FBQTtJQUNmLG1DQUFhLENBQUE7SUFDYixtQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUxXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFLN0I7O0lBZ0M2Qiw0QkFBaUI7Ozs7SUFnQjdDLHVDQUFvQixhQUFDLElBQWE7SUFTbEMsdUJBQUk7SUFTSix1QkFBSTtJQVVKLGdDQUFhLGFBQUMsSUFBd0I7SUFVdEMsbUNBQWdCLGFBQUMsS0FBb0I7SUFVckMsZ0NBQWEsYUFBQyxPQUFnQjtJQVc5QixpQ0FBYztJQWFkLHFDQUFrQjtJQWFsQixvQ0FBaUI7SUFhakIsaUNBQWM7SUFhZCxxQ0FBa0I7SUFhbEIsb0NBQWlCOzBCQXRJakIsK0JBQVM7Ozs7Ozs7Ozs7O21CQXBEWDtFQThDOEIsaUJBQWlCO1NBQWxDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgQ29yZG92YVByb3BlcnR5LCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZW51bSBLZXlib2FyZFN0eWxlIHtcbiAgTGlnaHQgPSAnbGlnaHQnLFxuICBEYXJrID0gJ2RhcmsnXG59XG5cbmV4cG9ydCBlbnVtIEtleWJvYXJkUmVzaXplTW9kZSB7XG4gIE5hdGl2ZSA9ICduYXRpdmUnLFxuICBJb25pYyA9ICdpb25pYycsXG4gIEJvZHkgPSAnYm9keScsXG4gIE5vbmUgPSAnbm9uZSdcbn1cblxuXG4vKipcbiAqIEBuYW1lIEtleWJvYXJkXG4gKiBAZGVzY3JpcHRpb25cbiAqIEtleWJvYXJkIHBsdWdpbiBmb3IgQ29yZG92YS5cbiAqXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogYGNvcmRvdmEtcGx1Z2luLWlvbmljLWtleWJvYXJkYC4gRm9yIG1vcmUgaW5mbywgcGxlYXNlIHNlZSB0aGUgW0tleWJvYXJkIHBsdWdpbiBkb2NzXShodHRwczovL2dpdGh1Yi5jb20vaW9uaWMtdGVhbS9jb3Jkb3ZhLXBsdWdpbi1pb25pYy1rZXlib2FyZCkuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJ0Bpb25pYy1uYXRpdmUva2V5Ym9hcmQvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGtleWJvYXJkOiBLZXlib2FyZCkgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5rZXlib2FyZC5zaG93KCk7XG4gKlxuICogdGhpcy5rZXlib2FyZC5oaWRlKCk7XG4gKlxuICogYGBgXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnS2V5Ym9hcmQnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1pb25pYy1rZXlib2FyZCcsXG4gIHBsdWdpblJlZjogJ3dpbmRvdy5LZXlib2FyZCcsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vaW9uaWMtdGVhbS9jb3Jkb3ZhLXBsdWdpbi1pb25pYy1rZXlib2FyZCcsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtleWJvYXJkIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogQ2hlY2sga2V5Ym9hcmQgc3RhdHVzIHZpc2libGUgb3Igbm90LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIEBDb3Jkb3ZhUHJvcGVydHkoKVxuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhlIGtleWJvYXJkIGFjY2Vzc29yeSBiYXIgd2l0aCB0aGUgbmV4dCwgcHJldmlvdXMgYW5kIGRvbmUgYnV0dG9ucy5cbiAgICogQHBhcmFtIGhpZGUge2Jvb2xlYW59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgICBwbGF0Zm9ybXM6IFsnaU9TJ11cbiAgfSlcbiAgaGlkZUZvcm1BY2Nlc3NvcnlCYXIoaGlkZTogYm9vbGVhbik6IHZvaWQge31cblxuICAvKipcbiAgICogSGlkZSB0aGUga2V5Ym9hcmQgaWYgc2hvd24uXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgICBwbGF0Zm9ybXM6IFsnaU9TJywgJ0FuZHJvaWQnXVxuICB9KVxuICBoaWRlKCk6IHZvaWQge31cblxuICAvKipcbiAgICogRm9yY2Uga2V5Ym9hcmQgdG8gYmUgc2hvd24uXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddXG4gIH0pXG4gIHNob3coKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBQcm9ncmFtYXRpY2FsbHkgc2V0IHRoZSByZXNpemUgbW9kZVxuICAgKiBAcGFyYW0gbW9kZSB7c3RyaW5nfVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gICAgcGxhdGZvcm1zOiBbJ2lPUyddXG4gIH0pXG4gIHNldFJlc2l6ZU1vZGUobW9kZTogS2V5Ym9hcmRSZXNpemVNb2RlKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBQcm9ncmFtYXRpY2FsbHkgc2V0IEtleWJvYXJkIHN0eWxlXG4gICAqIEBwYXJhbSBtb2RlIHtzdHJpbmd9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgICBwbGF0Zm9ybXM6IFsnaU9TJ11cbiAgfSlcbiAgc2V0S2V5Ym9hcmRTdHlsZShzdHlsZTogS2V5Ym9hcmRTdHlsZSk6IHZvaWQge31cblxuICAvKipcbiAgICogUHJvZ3JhbWF0aWNhbGx5IGVuYWJsZSBvciBkaXNhYmxlIHRoZSBXZWJWaWV3IHNjcm9sbFxuICAgKiBAcGFyYW0gbW9kZSB7c3RyaW5nfVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gICAgcGxhdGZvcm1zOiBbJ2lPUyddXG4gIH0pXG4gIGRpc2FibGVTY3JvbGwoZGlzYWJsZTogYm9vbGVhbik6IHZvaWQge31cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgeW91IHdoZW4gdGhlIGtleWJvYXJkIGlzIHNob3duLiBVbnN1YnNjcmliZSB0byBvYnNlcnZhYmxlIHRvIGNhbmNlbCBldmVudCB3YXRjaC5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBldmVudE9ic2VydmFibGU6IHRydWUsXG4gICAgZXZlbnQ6ICduYXRpdmUua2V5Ym9hcmRzaG93JyxcbiAgICBwbGF0Zm9ybXM6IFsnaU9TJywgJ0FuZHJvaWQnXVxuICB9KVxuICBvbktleWJvYXJkU2hvdygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugd2hlbiB0aGUga2V5Ym9hcmQgd2lsbCBzaG93LiBVbnN1YnNjcmliZSB0byBvYnNlcnZhYmxlIHRvIGNhbmNlbCBldmVudCB3YXRjaC5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBldmVudE9ic2VydmFibGU6IHRydWUsXG4gICAgZXZlbnQ6ICdrZXlib2FyZFdpbGxTaG93JyxcbiAgICBwbGF0Zm9ybXM6IFsnaU9TJywgJ0FuZHJvaWQnXVxuICB9KVxuICBvbktleWJvYXJkV2lsbFNob3coKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgeW91IHdoZW4gdGhlIGtleWJvYXJkIGRpZCBzaG93LiBVbnN1YnNjcmliZSB0byBvYnNlcnZhYmxlIHRvIGNhbmNlbCBldmVudCB3YXRjaC5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBldmVudE9ic2VydmFibGU6IHRydWUsXG4gICAgZXZlbnQ6ICdrZXlib2FyZERpZFNob3cnLFxuICAgIHBsYXRmb3JtczogWydpT1MnLCAnQW5kcm9pZCddXG4gIH0pXG4gIG9uS2V5Ym9hcmREaWRTaG93KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSB3aGVuIHRoZSBrZXlib2FyZCBpcyBoaWRkZW4uIFVuc3Vic2NyaWJlIHRvIG9ic2VydmFibGUgdG8gY2FuY2VsIGV2ZW50IHdhdGNoLlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGV2ZW50T2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBldmVudDogJ25hdGl2ZS5rZXlib2FyZGhpZGUnLFxuICAgIHBsYXRmb3JtczogWydpT1MnLCAnQW5kcm9pZCddXG4gIH0pXG4gIG9uS2V5Ym9hcmRIaWRlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSB3aGVuIHRoZSBrZXlib2FyZCB3aWxsIGhpZGUuIFVuc3Vic2NyaWJlIHRvIG9ic2VydmFibGUgdG8gY2FuY2VsIGV2ZW50IHdhdGNoLlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGV2ZW50T2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBldmVudDogJ2tleWJvYXJkV2lsbEhpZGUnLFxuICAgIHBsYXRmb3JtczogWydpT1MnLCAnQW5kcm9pZCddXG4gIH0pXG4gIG9uS2V5Ym9hcmRXaWxsSGlkZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugd2hlbiB0aGUga2V5Ym9hcmQgZGlkIGhpZGUuIFVuc3Vic2NyaWJlIHRvIG9ic2VydmFibGUgdG8gY2FuY2VsIGV2ZW50IHdhdGNoLlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGV2ZW50T2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBldmVudDogJ2tleWJvYXJkRGlkSGlkZScsXG4gICAgcGxhdGZvcm1zOiBbJ2lPUycsICdBbmRyb2lkJ11cbiAgfSlcbiAgb25LZXlib2FyZERpZEhpZGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==