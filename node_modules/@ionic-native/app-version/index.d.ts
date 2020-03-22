import { IonicNativePlugin } from '@ionic-native/core';
/**
 * @name App Version
 * @description
 * Reads the version of your app from the target build settings.
 *
 * Requires Cordova plugin: `cordova-plugin-app-version`. For more info, please see the [Cordova App Version docs](https://github.com/whiteoctober/cordova-plugin-app-version).
 *
 * @usage
 * ```typescript
 * import { AppVersion } from '@ionic-native/app-version/ngx';
 *
 * constructor(private appVersion: AppVersion) { }
 *
 * ...
 *
 *
 * this.appVersion.getAppName();
 * this.appVersion.getPackageName();
 * this.appVersion.getVersionCode();
 * this.appVersion.getVersionNumber();
 *
 * ```
 */
export declare class AppVersionOriginal extends IonicNativePlugin {
    /**
     * Returns the name of the app, e.g.: "My Awesome App"
     * @returns {Promise<string>}
     */
    getAppName(): Promise<string>;
    /**
     * Returns the package name of the app, e.g.: "com.example.myawesomeapp"
     * @returns {Promise<string>}
     */
    getPackageName(): Promise<string>;
    /**
     * Returns the build identifier of the app.
     * In iOS a string with the build version like "1.6095"
     * In Android a number generated from the version string, like 10203 for version "1.2.3"
     * @returns {Promise<string | number>}
     */
    getVersionCode(): Promise<string | number>;
    /**
     * Returns the version of the app, e.g.: "1.2.3"
     * @returns {Promise<string>}
     */
    getVersionNumber(): Promise<string>;
}

export declare const AppVersion: AppVersionOriginal;