import { IonicNativePlugin } from '@ionic-native/core';
export interface EmailComposerOptions {
    /**
     * App to send the email with
     */
    app?: string;
    /**
     * Email address(es) for To field
     */
    to?: string | string[];
    /**
     * Email address(es) for CC field
     */
    cc?: string | string[];
    /**
     * Email address(es) for BCC field
     */
    bcc?: string | string[];
    /**
     * File paths or base64 data streams
     */
    attachments?: string[];
    /**
     * Subject of the email
     */
    subject?: string;
    /**
     * Email body (for HTML, set isHtml to true)
     */
    body?: string;
    /**
     * Indicates if the body is HTML or plain text
     */
    isHtml?: boolean;
    /**
     *  Content type of the email (Android only)
     */
    type?: string;
}
/**
 * @name Email Composer
 * @description
 *
 * Requires Cordova plugin: cordova-plugin-email-composer. For more info, please see the [Email Composer plugin docs](https://github.com/hypery2k/cordova-email-plugin).
 *
 *
 * @usage
 * ```typescript
 * import { EmailComposer } from '@ionic-native/email-composer/ngx';
 *
 * constructor(private emailComposer: EmailComposer) { }
 *
 * ...
 *
 *
 * this.emailComposer.getClients().then((apps: []) => {
 *    // Returns an array of configured email clients for the device
 * });
 *
 * this.emailComposer.hasClient().then(app, (isValid: boolean) => {
 *  if (isValid) {
 *    // Now we know we have a valid email client configured
 *    // Not specifying an app will return true if at least one email client is configured
 *  }
 * });
 *
 * this.emailComposer.hasAccount().then((isValid: boolean) => {
 *  if (isValid) {
 *    // Now we know we have a valid email account configured
 *  }
 * });
 *
 * this.emailComposer.isAvailable().then(app, (available: boolean) => {
 *  if(available) {
 *    // Now we know we can send an email, calls hasClient and hasAccount
 *    // Not specifying an app will return true if at least one email client is configured
 *  }
 * });
 *
 * let email = {
 *   to: 'max@mustermann.de',
 *   cc: 'erika@mustermann.de',
 *   bcc: ['john@doe.com', 'jane@doe.com'],
 *   attachments: [
 *     'file://img/logo.png',
 *     'res://icon.png',
 *     'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
 *     'file://README.pdf'
 *   ],
 *   subject: 'Cordova Icons',
 *   body: 'How are you? Nice greetings from Leipzig',
 *   isHtml: true
 * }
 *
 * // Send a text message using default options
 * this.emailComposer.open(email);
 * ```
 *
 * You can also assign aliases to email apps
 * ```ts
 * // add alias
 * this.email.addAlias('gmail', 'com.google.android.gm');
 *
 * // then use alias when sending email
 * this.email.open({
 *   app: 'gmail',
 *   ...
 * });
 * ```
 * @interfaces
 * EmailComposerOptions
 */
export declare class EmailComposerOriginal extends IonicNativePlugin {
    /**
     * Checks if the app has a permission to access email accounts information
     * @return {Promise<boolean>} returns a promise that resolves with a boolean that indicates if the permission was granted
     */
    hasPermission(): Promise<boolean>;
    /**
     * Request permission to access email accounts information
     * @return {Promise<boolean>} returns a promise that resolves with a boolean that indicates if the permission was granted
     */
    requestPermission(): Promise<boolean>;
    /**
     * Verifies if an email account is configured on the device.
     *
     * @returns {Promise<any>} Resolves if available, rejects if not available
     */
    hasAccount(): Promise<any>;
    /**
     * Verifies if a specific email client is installed on the device.
     *
     * @param {string} [app] App id or uri scheme.
     * @returns {Promise<any>} Resolves if available, rejects if not available
     */
    hasClient(app?: string): Promise<any>;
    /**
     * Returns an array of email clients installed on the device.
     *
     * @returns {Promise<string[]>} Resolves if available, rejects if not available
     */
    getClients(): Promise<string[]>;
    /**
     * Verifies if sending emails is supported on the device.
     *
     * @param {string} [app] App id or uri scheme.
     * @returns {Promise<any>} Resolves if available, rejects if not available
     */
    isAvailable(app?: string): Promise<any>;
    /**
     * Displays the email composer pre-filled with data.
     *
     * @param {EmailComposerOptions} options Email
     * @param {any} [scope] Scope for the promise
     * @returns {Promise<any>} Resolves promise when the EmailComposer has been opened
     */
    open(options: EmailComposerOptions, scope?: any): Promise<any>;
    /**
     * Adds a new mail app alias.
     *
     * @param {string} alias The alias name
     * @param {string} packageName The package name
     */
    addAlias(alias: string, packageName: string): void;
}

export declare const EmailComposer: EmailComposerOriginal;