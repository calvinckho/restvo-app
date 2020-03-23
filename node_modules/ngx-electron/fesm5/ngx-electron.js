import { Injectable, NgModule } from '@angular/core';
import { __extends } from 'tslib';

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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ElectronService.prototype._electron;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ElectronServiceRef = /** @class */ (function (_super) {
    __extends(ElectronServiceRef, _super);
    function ElectronServiceRef() {
        return _super.call(this) || this;
    }
    ElectronServiceRef.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ElectronServiceRef.ctorParameters = function () { return []; };
    return ElectronServiceRef;
}(ElectronService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxElectronModule = /** @class */ (function () {
    function NgxElectronModule() {
    }
    NgxElectronModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    exports: [],
                    providers: [{ provide: ElectronService, useClass: ElectronServiceRef }]
                },] }
    ];
    return NgxElectronModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ElectronService, ElectronServiceRef, NgxElectronModule };
//# sourceMappingURL=ngx-electron.js.map
