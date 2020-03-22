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
import { IonicNativePlugin, checkAvailability, cordova, getPromise } from '@ionic-native/core';
var EmailComposerOriginal = /** @class */ (function (_super) {
    __extends(EmailComposerOriginal, _super);
    function EmailComposerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailComposerOriginal.prototype.hasPermission = function () { return cordova(this, "hasPermission", { "successIndex": 0, "errorIndex": 2 }, arguments); };
    EmailComposerOriginal.prototype.requestPermission = function () { return cordova(this, "requestPermission", { "successIndex": 0, "errorIndex": 2 }, arguments); };
    EmailComposerOriginal.prototype.hasAccount = function () {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    EmailComposerOriginal.getPlugin().hasAccount(function (result) {
                        if (result) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    });
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.hasClient = function (app) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    if (app) {
                        EmailComposerOriginal.getPlugin().hasClient(app, function (result) {
                            if (result) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    }
                    else {
                        EmailComposerOriginal.getPlugin().getClients(function (apps) {
                            resolve(apps.length && apps.length > 0);
                        });
                    }
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.getClients = function () {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    EmailComposerOriginal.getPlugin().getClients(function (apps) {
                        if (Object.prototype.toString.call(apps) === '[object String]') {
                            apps = [apps];
                        }
                        resolve(apps);
                    });
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.isAvailable = function (app) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    Promise.all([_this.hasAccount, _this.hasClient(app)])
                        .then(function (results) {
                        return resolve(results.length === 2 && results[0] && results[1]);
                    });
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.open = function (options, scope) { return cordova(this, "open", { "successIndex": 1, "errorIndex": 3 }, arguments); };
    EmailComposerOriginal.prototype.addAlias = function (alias, packageName) { return cordova(this, "addAlias", {}, arguments); };
    EmailComposerOriginal.pluginName = "EmailComposer";
    EmailComposerOriginal.plugin = "cordova-plugin-email-composer";
    EmailComposerOriginal.pluginRef = "cordova.plugins.email";
    EmailComposerOriginal.repo = "https://github.com/katzer/cordova-plugin-email-composer";
    EmailComposerOriginal.platforms = ["Amazon Fire OS", "Android", "Browser", "iOS", "Windows", "macOS"];
    return EmailComposerOriginal;
}(IonicNativePlugin));
var EmailComposer = new EmailComposerOriginal();
export { EmailComposer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2VtYWlsLWNvbXBvc2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLGlEQUtMLFVBQVUsRUFDWCxNQUFNLG9CQUFvQixDQUFDOztJQWtJTyxpQ0FBaUI7Ozs7SUFTbEQscUNBQWE7SUFZYix5Q0FBaUI7SUFVakIsa0NBQVU7OzttREFBaUI7Z0JBQ3pCLE9BQU8sVUFBVSxDQUFVLFVBQUMsT0FBTztvQkFDakMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFDLE1BQWU7d0JBQ25ELElBQUksTUFBTSxFQUFFOzRCQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDZjs2QkFBTTs0QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2hCO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7OztJQVVELGlDQUFTLGFBQUMsR0FBWTs7O21EQUFnQjtnQkFDcEMsT0FBTyxVQUFVLENBQVUsVUFBQyxPQUFPO29CQUNqQyxJQUFJLEdBQUcsRUFBRTt3QkFDUCxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFDLE1BQWU7NEJBQ3ZELElBQUksTUFBTSxFQUFFO2dDQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDZjtpQ0FBTTtnQ0FDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ2hCO3dCQUNILENBQUMsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNO3dCQUNMLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBQyxJQUFjOzRCQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxDQUFDLENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKOzs7SUFTRCxrQ0FBVTs7O21EQUFzQjtnQkFDOUIsT0FBTyxVQUFVLENBQVcsVUFBQSxPQUFPO29CQUNqQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQUMsSUFBUzt3QkFDN0MsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssaUJBQWlCLEVBQUU7NEJBQzlELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNqQjt3QkFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7OztJQVNELG1DQUFXLGFBQUMsR0FBWTs7O21EQUFnQjtnQkFDdEMsT0FBTyxVQUFVLENBQVUsVUFBQyxPQUFPO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7eUJBQ2hELElBQUksQ0FBQyxVQUFDLE9BQU87d0JBQ1osT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRSxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQzthQUNKOzs7SUFhRCw0QkFBSSxhQUFDLE9BQTZCLEVBQUUsS0FBVztJQVcvQyxnQ0FBUSxhQUFDLEtBQWEsRUFBRSxXQUFtQjs7Ozs7O3dCQXRRN0M7RUF5SW1DLGlCQUFpQjtTQUF2QyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29yZG92YSxcbiAgQ29yZG92YUNoZWNrLFxuICBJb25pY05hdGl2ZVBsdWdpbixcbiAgUGx1Z2luLFxuICBnZXRQcm9taXNlXG59IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxDb21wb3Nlck9wdGlvbnMge1xuICAvKipcbiAgICogQXBwIHRvIHNlbmQgdGhlIGVtYWlsIHdpdGhcbiAgICovXG4gIGFwcD86IHN0cmluZztcblxuICAvKipcbiAgICogRW1haWwgYWRkcmVzcyhlcykgZm9yIFRvIGZpZWxkXG4gICAqL1xuICB0bz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBFbWFpbCBhZGRyZXNzKGVzKSBmb3IgQ0MgZmllbGRcbiAgICovXG4gIGNjPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEVtYWlsIGFkZHJlc3MoZXMpIGZvciBCQ0MgZmllbGRcbiAgICovXG4gIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBGaWxlIHBhdGhzIG9yIGJhc2U2NCBkYXRhIHN0cmVhbXNcbiAgICovXG4gIGF0dGFjaG1lbnRzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFN1YmplY3Qgb2YgdGhlIGVtYWlsXG4gICAqL1xuICBzdWJqZWN0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBFbWFpbCBib2R5IChmb3IgSFRNTCwgc2V0IGlzSHRtbCB0byB0cnVlKVxuICAgKi9cbiAgYm9keT86IHN0cmluZztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBib2R5IGlzIEhUTUwgb3IgcGxhaW4gdGV4dFxuICAgKi9cbiAgaXNIdG1sPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogIENvbnRlbnQgdHlwZSBvZiB0aGUgZW1haWwgKEFuZHJvaWQgb25seSlcbiAgICovXG4gIHR5cGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQG5hbWUgRW1haWwgQ29tcG9zZXJcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcXVpcmVzIENvcmRvdmEgcGx1Z2luOiBjb3Jkb3ZhLXBsdWdpbi1lbWFpbC1jb21wb3Nlci4gRm9yIG1vcmUgaW5mbywgcGxlYXNlIHNlZSB0aGUgW0VtYWlsIENvbXBvc2VyIHBsdWdpbiBkb2NzXShodHRwczovL2dpdGh1Yi5jb20vaHlwZXJ5MmsvY29yZG92YS1lbWFpbC1wbHVnaW4pLlxuICpcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IEVtYWlsQ29tcG9zZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2VtYWlsLWNvbXBvc2VyL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbENvbXBvc2VyOiBFbWFpbENvbXBvc2VyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogdGhpcy5lbWFpbENvbXBvc2VyLmdldENsaWVudHMoKS50aGVuKChhcHBzOiBbXSkgPT4ge1xuICogICAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiBjb25maWd1cmVkIGVtYWlsIGNsaWVudHMgZm9yIHRoZSBkZXZpY2VcbiAqIH0pO1xuICpcbiAqIHRoaXMuZW1haWxDb21wb3Nlci5oYXNDbGllbnQoKS50aGVuKGFwcCwgKGlzVmFsaWQ6IGJvb2xlYW4pID0+IHtcbiAqICBpZiAoaXNWYWxpZCkge1xuICogICAgLy8gTm93IHdlIGtub3cgd2UgaGF2ZSBhIHZhbGlkIGVtYWlsIGNsaWVudCBjb25maWd1cmVkXG4gKiAgICAvLyBOb3Qgc3BlY2lmeWluZyBhbiBhcHAgd2lsbCByZXR1cm4gdHJ1ZSBpZiBhdCBsZWFzdCBvbmUgZW1haWwgY2xpZW50IGlzIGNvbmZpZ3VyZWRcbiAqICB9XG4gKiB9KTtcbiAqXG4gKiB0aGlzLmVtYWlsQ29tcG9zZXIuaGFzQWNjb3VudCgpLnRoZW4oKGlzVmFsaWQ6IGJvb2xlYW4pID0+IHtcbiAqICBpZiAoaXNWYWxpZCkge1xuICogICAgLy8gTm93IHdlIGtub3cgd2UgaGF2ZSBhIHZhbGlkIGVtYWlsIGFjY291bnQgY29uZmlndXJlZFxuICogIH1cbiAqIH0pO1xuICpcbiAqIHRoaXMuZW1haWxDb21wb3Nlci5pc0F2YWlsYWJsZSgpLnRoZW4oYXBwLCAoYXZhaWxhYmxlOiBib29sZWFuKSA9PiB7XG4gKiAgaWYoYXZhaWxhYmxlKSB7XG4gKiAgICAvLyBOb3cgd2Uga25vdyB3ZSBjYW4gc2VuZCBhbiBlbWFpbCwgY2FsbHMgaGFzQ2xpZW50IGFuZCBoYXNBY2NvdW50XG4gKiAgICAvLyBOb3Qgc3BlY2lmeWluZyBhbiBhcHAgd2lsbCByZXR1cm4gdHJ1ZSBpZiBhdCBsZWFzdCBvbmUgZW1haWwgY2xpZW50IGlzIGNvbmZpZ3VyZWRcbiAqICB9XG4gKiB9KTtcbiAqXG4gKiBsZXQgZW1haWwgPSB7XG4gKiAgIHRvOiAnbWF4QG11c3Rlcm1hbm4uZGUnLFxuICogICBjYzogJ2VyaWthQG11c3Rlcm1hbm4uZGUnLFxuICogICBiY2M6IFsnam9obkBkb2UuY29tJywgJ2phbmVAZG9lLmNvbSddLFxuICogICBhdHRhY2htZW50czogW1xuICogICAgICdmaWxlOi8vaW1nL2xvZ28ucG5nJyxcbiAqICAgICAncmVzOi8vaWNvbi5wbmcnLFxuICogICAgICdiYXNlNjQ6aWNvbi5wbmcvL2lWQk9SdzBLR2dvQUFBQU5TVWhFVWcuLi4nLFxuICogICAgICdmaWxlOi8vUkVBRE1FLnBkZidcbiAqICAgXSxcbiAqICAgc3ViamVjdDogJ0NvcmRvdmEgSWNvbnMnLFxuICogICBib2R5OiAnSG93IGFyZSB5b3U/IE5pY2UgZ3JlZXRpbmdzIGZyb20gTGVpcHppZycsXG4gKiAgIGlzSHRtbDogdHJ1ZVxuICogfVxuICpcbiAqIC8vIFNlbmQgYSB0ZXh0IG1lc3NhZ2UgdXNpbmcgZGVmYXVsdCBvcHRpb25zXG4gKiB0aGlzLmVtYWlsQ29tcG9zZXIub3BlbihlbWFpbCk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFsc28gYXNzaWduIGFsaWFzZXMgdG8gZW1haWwgYXBwc1xuICogYGBgdHNcbiAqIC8vIGFkZCBhbGlhc1xuICogdGhpcy5lbWFpbC5hZGRBbGlhcygnZ21haWwnLCAnY29tLmdvb2dsZS5hbmRyb2lkLmdtJyk7XG4gKlxuICogLy8gdGhlbiB1c2UgYWxpYXMgd2hlbiBzZW5kaW5nIGVtYWlsXG4gKiB0aGlzLmVtYWlsLm9wZW4oe1xuICogICBhcHA6ICdnbWFpbCcsXG4gKiAgIC4uLlxuICogfSk7XG4gKiBgYGBcbiAqIEBpbnRlcmZhY2VzXG4gKiBFbWFpbENvbXBvc2VyT3B0aW9uc1xuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0VtYWlsQ29tcG9zZXInLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1lbWFpbC1jb21wb3NlcicsXG4gIHBsdWdpblJlZjogJ2NvcmRvdmEucGx1Z2lucy5lbWFpbCcsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20va2F0emVyL2NvcmRvdmEtcGx1Z2luLWVtYWlsLWNvbXBvc2VyJyxcbiAgcGxhdGZvcm1zOiBbJ0FtYXpvbiBGaXJlIE9TJywgJ0FuZHJvaWQnLCAnQnJvd3NlcicsICdpT1MnLCAnV2luZG93cycsICdtYWNPUyddXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVtYWlsQ29tcG9zZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGFwcCBoYXMgYSBwZXJtaXNzaW9uIHRvIGFjY2VzcyBlbWFpbCBhY2NvdW50cyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBwZXJtaXNzaW9uIHdhcyBncmFudGVkXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3VjY2Vzc0luZGV4OiAwLFxuICAgIGVycm9ySW5kZXg6IDJcbiAgfSlcbiAgaGFzUGVybWlzc2lvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCBwZXJtaXNzaW9uIHRvIGFjY2VzcyBlbWFpbCBhY2NvdW50cyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBwZXJtaXNzaW9uIHdhcyBncmFudGVkXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3VjY2Vzc0luZGV4OiAwLFxuICAgIGVycm9ySW5kZXg6IDJcbiAgfSlcbiAgcmVxdWVzdFBlcm1pc3Npb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIGFuIGVtYWlsIGFjY291bnQgaXMgY29uZmlndXJlZCBvbiB0aGUgZGV2aWNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXNvbHZlcyBpZiBhdmFpbGFibGUsIHJlamVjdHMgaWYgbm90IGF2YWlsYWJsZVxuICAgKi9cbiAgQENvcmRvdmFDaGVjaygpXG4gIGhhc0FjY291bnQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gZ2V0UHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSkgPT4ge1xuICAgICAgRW1haWxDb21wb3Nlci5nZXRQbHVnaW4oKS5oYXNBY2NvdW50KChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIGEgc3BlY2lmaWMgZW1haWwgY2xpZW50IGlzIGluc3RhbGxlZCBvbiB0aGUgZGV2aWNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwcF0gQXBwIGlkIG9yIHVyaSBzY2hlbWUuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJlc29sdmVzIGlmIGF2YWlsYWJsZSwgcmVqZWN0cyBpZiBub3QgYXZhaWxhYmxlXG4gICAqL1xuXG4gIEBDb3Jkb3ZhQ2hlY2soKVxuICBoYXNDbGllbnQoYXBwPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gZ2V0UHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKGFwcCkge1xuICAgICAgICBFbWFpbENvbXBvc2VyLmdldFBsdWdpbigpLmhhc0NsaWVudChhcHAsIChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRW1haWxDb21wb3Nlci5nZXRQbHVnaW4oKS5nZXRDbGllbnRzKChhcHBzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoYXBwcy5sZW5ndGggJiYgYXBwcy5sZW5ndGggPiAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBlbWFpbCBjbGllbnRzIGluc3RhbGxlZCBvbiB0aGUgZGV2aWNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmdbXT59IFJlc29sdmVzIGlmIGF2YWlsYWJsZSwgcmVqZWN0cyBpZiBub3QgYXZhaWxhYmxlXG4gICAqL1xuICBAQ29yZG92YUNoZWNrKClcbiAgQENvcmRvdmEoeyBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddIH0pXG4gIGdldENsaWVudHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiBnZXRQcm9taXNlPHN0cmluZ1tdPihyZXNvbHZlID0+IHtcbiAgICAgIEVtYWlsQ29tcG9zZXIuZ2V0UGx1Z2luKCkuZ2V0Q2xpZW50cygoYXBwczogYW55KSA9PiB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXBwcykgPT09ICdbb2JqZWN0IFN0cmluZ10nKSB7XG4gICAgICAgICAgYXBwcyA9IFthcHBzXTtcbiAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShhcHBzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHNlbmRpbmcgZW1haWxzIGlzIHN1cHBvcnRlZCBvbiB0aGUgZGV2aWNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwcF0gQXBwIGlkIG9yIHVyaSBzY2hlbWUuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJlc29sdmVzIGlmIGF2YWlsYWJsZSwgcmVqZWN0cyBpZiBub3QgYXZhaWxhYmxlXG4gICAqL1xuICBAQ29yZG92YUNoZWNrKClcbiAgaXNBdmFpbGFibGUoYXBwPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gZ2V0UHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSkgPT4ge1xuICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuaGFzQWNjb3VudCwgdGhpcy5oYXNDbGllbnQoYXBwKV0pXG4gICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0cy5sZW5ndGggPT09IDIgJiYgcmVzdWx0c1swXSAmJiByZXN1bHRzWzFdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheXMgdGhlIGVtYWlsIGNvbXBvc2VyIHByZS1maWxsZWQgd2l0aCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge0VtYWlsQ29tcG9zZXJPcHRpb25zfSBvcHRpb25zIEVtYWlsXG4gICAqIEBwYXJhbSB7YW55fSBbc2NvcGVdIFNjb3BlIGZvciB0aGUgcHJvbWlzZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXNvbHZlcyBwcm9taXNlIHdoZW4gdGhlIEVtYWlsQ29tcG9zZXIgaGFzIGJlZW4gb3BlbmVkXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3VjY2Vzc0luZGV4OiAxLFxuICAgIGVycm9ySW5kZXg6IDNcbiAgfSlcbiAgb3BlbihvcHRpb25zOiBFbWFpbENvbXBvc2VyT3B0aW9ucywgc2NvcGU/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG1haWwgYXBwIGFsaWFzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYWxpYXMgVGhlIGFsaWFzIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhY2thZ2VOYW1lIFRoZSBwYWNrYWdlIG5hbWVcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgYWRkQWxpYXMoYWxpYXM6IHN0cmluZywgcGFja2FnZU5hbWU6IHN0cmluZyk6IHZvaWQge31cbn1cbiJdfQ==