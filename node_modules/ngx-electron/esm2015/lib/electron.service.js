/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ElectronService {
    /**
     * @private
     * @return {?}
     */
    get electron() {
        if (!this._electron) {
            if (window && window.require) {
                this._electron = window.require('electron');
                return this._electron;
            }
            return null;
        }
        return this._electron;
    }
    /**
     * determines if SPA is running in Electron
     * @return {?}
     */
    get isElectronApp() {
        return !!window.navigator.userAgent.match(/Electron/);
    }
    /**
     * @return {?}
     */
    get isMacOS() {
        return this.isElectronApp && process.platform === 'darwin';
    }
    /**
     * @return {?}
     */
    get isWindows() {
        return this.isElectronApp && process.platform === 'win32';
    }
    /**
     * @return {?}
     */
    get isLinux() {
        return this.isElectronApp && process.platform === 'linux';
    }
    /**
     * @return {?}
     */
    get isX86() {
        return this.isElectronApp && process.arch === 'ia32';
    }
    /**
     * @return {?}
     */
    get isX64() {
        return this.isElectronApp && process.arch === 'x64';
    }
    /**
     * @return {?}
     */
    get isArm() {
        return this.isElectronApp && process.arch === 'arm';
    }
    /**
     * @return {?}
     */
    get desktopCapturer() {
        return this.electron ? this.electron.desktopCapturer : null;
    }
    /**
     * @return {?}
     */
    get ipcRenderer() {
        return this.electron ? this.electron.ipcRenderer : null;
    }
    /**
     * @return {?}
     */
    get remote() {
        return this.electron ? this.electron.remote : null;
    }
    /**
     * @return {?}
     */
    get webFrame() {
        return this.electron ? this.electron.webFrame : null;
    }
    /**
     * @return {?}
     */
    get clipboard() {
        return this.electron ? this.electron.clipboard : null;
    }
    /**
     * @return {?}
     */
    get crashReporter() {
        return this.electron ? this.electron.crashReporter : null;
    }
    /**
     * @return {?}
     */
    get process() {
        return this.remote ? this.remote.process : null;
    }
    /**
     * @return {?}
     */
    get nativeImage() {
        return this.electron ? this.electron.nativeImage : null;
    }
    /**
     * @return {?}
     */
    get screen() {
        return this.electron ? this.remote.screen : null;
    }
    /**
     * @return {?}
     */
    get shell() {
        return this.electron ? this.electron.shell : null;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ElectronService.prototype._electron;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1lbGVjdHJvbi8iLCJzb3VyY2VzIjpbImxpYi9lbGVjdHJvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFHeEIsSUFBWSxRQUFRO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUtELElBQVcsYUFBYTtRQUNwQixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7OztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztJQUM5RCxDQUFDOzs7O0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO0lBQzlELENBQUM7Ozs7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7SUFDekQsQ0FBQzs7OztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztJQUN4RCxDQUFDOzs7O0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO0lBQ3hELENBQUM7Ozs7SUFFRCxJQUFXLGVBQWU7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hFLENBQUM7Ozs7SUFFRCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVELENBQUM7Ozs7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6RCxDQUFDOzs7O0lBRUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RCxDQUFDOzs7O0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7Ozs7SUFFRCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVELENBQUM7Ozs7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RCxDQUFDO0NBQ0o7Ozs7OztJQW5GRyxvQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBFbGVjdHJvbiBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBFbGVjdHJvbldpbmRvdyB9IGZyb20gJy4vdHlwaW5ncy9lbGVjdHJvbi53aW5kb3cnO1xuXG5kZWNsYXJlIGxldCB3aW5kb3c6IEVsZWN0cm9uV2luZG93O1xuXG5leHBvcnQgY2xhc3MgRWxlY3Ryb25TZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9lbGVjdHJvbjogRWxlY3Ryb24uUmVuZGVyZXJJbnRlcmZhY2U7XG5cbiAgICBwcml2YXRlIGdldCBlbGVjdHJvbigpOiBFbGVjdHJvbi5SZW5kZXJlckludGVyZmFjZSB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlY3Ryb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LnJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVjdHJvbiA9IHdpbmRvdy5yZXF1aXJlKCdlbGVjdHJvbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVjdHJvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVjdHJvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIFNQQSBpcyBydW5uaW5nIGluIEVsZWN0cm9uXG4gICAgICovXG4gICAgcHVibGljIGdldCBpc0VsZWN0cm9uQXBwKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWxlY3Ryb24vKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzTWFjT1MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2Rhcndpbic7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1dpbmRvd3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzTGludXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2xpbnV4JztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzWDg2KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0VsZWN0cm9uQXBwICYmIHByb2Nlc3MuYXJjaCA9PT0gJ2lhMzInO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNYNjQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5hcmNoID09PSAneDY0JztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzQXJtKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0VsZWN0cm9uQXBwICYmIHByb2Nlc3MuYXJjaCA9PT0gJ2FybSc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkZXNrdG9wQ2FwdHVyZXIoKTogRWxlY3Ryb24uRGVza3RvcENhcHR1cmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLmRlc2t0b3BDYXB0dXJlciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpcGNSZW5kZXJlcigpOiBFbGVjdHJvbi5JcGNSZW5kZXJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZWN0cm9uID8gdGhpcy5lbGVjdHJvbi5pcGNSZW5kZXJlciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZW1vdGUoKTogRWxlY3Ryb24uUmVtb3RlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLnJlbW90ZSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB3ZWJGcmFtZSgpOiBFbGVjdHJvbi5XZWJGcmFtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZWN0cm9uID8gdGhpcy5lbGVjdHJvbi53ZWJGcmFtZSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjbGlwYm9hcmQoKTogRWxlY3Ryb24uQ2xpcGJvYXJkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLmNsaXBib2FyZCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjcmFzaFJlcG9ydGVyKCk6IEVsZWN0cm9uLkNyYXNoUmVwb3J0ZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVjdHJvbiA/IHRoaXMuZWxlY3Ryb24uY3Jhc2hSZXBvcnRlciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwcm9jZXNzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZSA/IHRoaXMucmVtb3RlLnByb2Nlc3MgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbmF0aXZlSW1hZ2UoKTogdHlwZW9mIEVsZWN0cm9uLm5hdGl2ZUltYWdlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLm5hdGl2ZUltYWdlIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNjcmVlbigpOiBFbGVjdHJvbi5TY3JlZW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVjdHJvbiA/IHRoaXMucmVtb3RlLnNjcmVlbiA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzaGVsbCgpOiBFbGVjdHJvbi5TaGVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZWN0cm9uID8gdGhpcy5lbGVjdHJvbi5zaGVsbCA6IG51bGw7XG4gICAgfVxufVxuIl19