import { Injectable, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ElectronService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ElectronServiceRef extends ElectronService {
    constructor() {
        super();
    }
}
ElectronServiceRef.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ElectronServiceRef.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxElectronModule {
}
NgxElectronModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                exports: [],
                providers: [{ provide: ElectronService, useClass: ElectronServiceRef }]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ElectronService, ElectronServiceRef, NgxElectronModule };
//# sourceMappingURL=ngx-electron.js.map
