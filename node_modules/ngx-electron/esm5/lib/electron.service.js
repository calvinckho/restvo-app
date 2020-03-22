/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ElectronService = /** @class */ (function () {
    function ElectronService() {
    }
    Object.defineProperty(ElectronService.prototype, "electron", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this._electron) {
                if (window && window.require) {
                    this._electron = window.require('electron');
                    return this._electron;
                }
                return null;
            }
            return this._electron;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isElectronApp", {
        /**
         * determines if SPA is running in Electron
         */
        get: /**
         * determines if SPA is running in Electron
         * @return {?}
         */
        function () {
            return !!window.navigator.userAgent.match(/Electron/);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isMacOS", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isElectronApp && process.platform === 'darwin';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isWindows", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isElectronApp && process.platform === 'win32';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isLinux", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isElectronApp && process.platform === 'linux';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isX86", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isElectronApp && process.arch === 'ia32';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isX64", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isElectronApp && process.arch === 'x64';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isArm", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isElectronApp && process.arch === 'arm';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "desktopCapturer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.desktopCapturer : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "ipcRenderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.ipcRenderer : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "remote", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.remote : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "webFrame", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.webFrame : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "clipboard", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.clipboard : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "crashReporter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.crashReporter : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "process", {
        get: /**
         * @return {?}
         */
        function () {
            return this.remote ? this.remote.process : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "nativeImage", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.nativeImage : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "screen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.remote.screen : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "shell", {
        get: /**
         * @return {?}
         */
        function () {
            return this.electron ? this.electron.shell : null;
        },
        enumerable: true,
        configurable: true
    });
    return ElectronService;
}());
export { ElectronService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ElectronService.prototype._electron;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1lbGVjdHJvbi8iLCJzb3VyY2VzIjpbImxpYi9lbGVjdHJvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQTtJQUFBO0lBb0ZBLENBQUM7SUFqRkcsc0JBQVkscUNBQVE7Ozs7O1FBQXBCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUN6QjtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsMENBQWE7UUFIeEI7O1dBRUc7Ozs7O1FBQ0g7WUFDSSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxvQ0FBTzs7OztRQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztRQUMvRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFTOzs7O1FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO1FBQzlELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsb0NBQU87Ozs7UUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7UUFDOUQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBSzs7OztRQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGtDQUFLOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsa0NBQUs7Ozs7UUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBZTs7OztRQUExQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFXOzs7O1FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQU07Ozs7UUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBUTs7OztRQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFTOzs7O1FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMENBQWE7Ozs7UUFBeEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDOUQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxvQ0FBTzs7OztRQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFXOzs7O1FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQU07Ozs7UUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBSzs7OztRQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN0RCxDQUFDOzs7T0FBQTtJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQXBGRCxJQW9GQzs7Ozs7OztJQW5GRyxvQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBFbGVjdHJvbiBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBFbGVjdHJvbldpbmRvdyB9IGZyb20gJy4vdHlwaW5ncy9lbGVjdHJvbi53aW5kb3cnO1xuXG5kZWNsYXJlIGxldCB3aW5kb3c6IEVsZWN0cm9uV2luZG93O1xuXG5leHBvcnQgY2xhc3MgRWxlY3Ryb25TZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9lbGVjdHJvbjogRWxlY3Ryb24uUmVuZGVyZXJJbnRlcmZhY2U7XG5cbiAgICBwcml2YXRlIGdldCBlbGVjdHJvbigpOiBFbGVjdHJvbi5SZW5kZXJlckludGVyZmFjZSB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlY3Ryb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LnJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVjdHJvbiA9IHdpbmRvdy5yZXF1aXJlKCdlbGVjdHJvbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVjdHJvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVjdHJvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIFNQQSBpcyBydW5uaW5nIGluIEVsZWN0cm9uXG4gICAgICovXG4gICAgcHVibGljIGdldCBpc0VsZWN0cm9uQXBwKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWxlY3Ryb24vKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzTWFjT1MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2Rhcndpbic7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1dpbmRvd3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzTGludXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2xpbnV4JztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzWDg2KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0VsZWN0cm9uQXBwICYmIHByb2Nlc3MuYXJjaCA9PT0gJ2lhMzInO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNYNjQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlY3Ryb25BcHAgJiYgcHJvY2Vzcy5hcmNoID09PSAneDY0JztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzQXJtKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0VsZWN0cm9uQXBwICYmIHByb2Nlc3MuYXJjaCA9PT0gJ2FybSc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkZXNrdG9wQ2FwdHVyZXIoKTogRWxlY3Ryb24uRGVza3RvcENhcHR1cmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLmRlc2t0b3BDYXB0dXJlciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpcGNSZW5kZXJlcigpOiBFbGVjdHJvbi5JcGNSZW5kZXJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZWN0cm9uID8gdGhpcy5lbGVjdHJvbi5pcGNSZW5kZXJlciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZW1vdGUoKTogRWxlY3Ryb24uUmVtb3RlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLnJlbW90ZSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB3ZWJGcmFtZSgpOiBFbGVjdHJvbi5XZWJGcmFtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZWN0cm9uID8gdGhpcy5lbGVjdHJvbi53ZWJGcmFtZSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjbGlwYm9hcmQoKTogRWxlY3Ryb24uQ2xpcGJvYXJkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLmNsaXBib2FyZCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjcmFzaFJlcG9ydGVyKCk6IEVsZWN0cm9uLkNyYXNoUmVwb3J0ZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVjdHJvbiA/IHRoaXMuZWxlY3Ryb24uY3Jhc2hSZXBvcnRlciA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwcm9jZXNzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZSA/IHRoaXMucmVtb3RlLnByb2Nlc3MgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbmF0aXZlSW1hZ2UoKTogdHlwZW9mIEVsZWN0cm9uLm5hdGl2ZUltYWdlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlY3Ryb24gPyB0aGlzLmVsZWN0cm9uLm5hdGl2ZUltYWdlIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNjcmVlbigpOiBFbGVjdHJvbi5TY3JlZW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVjdHJvbiA/IHRoaXMucmVtb3RlLnNjcmVlbiA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzaGVsbCgpOiBFbGVjdHJvbi5TaGVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZWN0cm9uID8gdGhpcy5lbGVjdHJvbi5zaGVsbCA6IG51bGw7XG4gICAgfVxufVxuIl19