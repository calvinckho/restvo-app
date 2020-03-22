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
import { IonicNativePlugin, checkAvailability, cordovaInstance, instanceAvailability, instancePropertyGet, instancePropertySet, getPromise } from '@ionic-native/core';
var Contact = /** @class */ (function () {
    function Contact() {
        if (checkAvailability('navigator.contacts', 'create', 'Contacts') === true) {
            this._objectInstance = navigator.contacts.create();
        }
    }
    Contact.prototype.clone = function () {
        var _this = this;
        return (function () {
            if (instanceAvailability(_this) === true) {
                var newContact = new Contact();
                for (var prop in _this) {
                    if (prop === 'id')
                        return;
                    newContact[prop] = _this[prop];
                }
                return newContact;
            }
        })();
    };
    Contact.prototype.remove = function () { return cordovaInstance(this, "remove", {}, arguments); };
    Contact.prototype.save = function () {
        var _this = this;
        return (function () {
            if (instanceAvailability(_this) === true) {
                return getPromise(function (resolve, reject) {
                    _this._objectInstance.save(function (contact) {
                        _this._objectInstance = contact;
                        resolve(_this);
                    }, reject);
                });
            }
        })();
    };
    Object.defineProperty(Contact.prototype, "id", {
        get: function () { return instancePropertyGet(this, "id"); },
        set: function (value) { instancePropertySet(this, "id", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "displayName", {
        get: function () { return instancePropertyGet(this, "displayName"); },
        set: function (value) { instancePropertySet(this, "displayName", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "name", {
        get: function () { return instancePropertyGet(this, "name"); },
        set: function (value) { instancePropertySet(this, "name", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "nickname", {
        get: function () { return instancePropertyGet(this, "nickname"); },
        set: function (value) { instancePropertySet(this, "nickname", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "phoneNumbers", {
        get: function () { return instancePropertyGet(this, "phoneNumbers"); },
        set: function (value) { instancePropertySet(this, "phoneNumbers", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "emails", {
        get: function () { return instancePropertyGet(this, "emails"); },
        set: function (value) { instancePropertySet(this, "emails", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "addresses", {
        get: function () { return instancePropertyGet(this, "addresses"); },
        set: function (value) { instancePropertySet(this, "addresses", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "ims", {
        get: function () { return instancePropertyGet(this, "ims"); },
        set: function (value) { instancePropertySet(this, "ims", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "organizations", {
        get: function () { return instancePropertyGet(this, "organizations"); },
        set: function (value) { instancePropertySet(this, "organizations", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "birthday", {
        get: function () { return instancePropertyGet(this, "birthday"); },
        set: function (value) { instancePropertySet(this, "birthday", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "note", {
        get: function () { return instancePropertyGet(this, "note"); },
        set: function (value) { instancePropertySet(this, "note", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "photos", {
        get: function () { return instancePropertyGet(this, "photos"); },
        set: function (value) { instancePropertySet(this, "photos", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "categories", {
        get: function () { return instancePropertyGet(this, "categories"); },
        set: function (value) { instancePropertySet(this, "categories", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "urls", {
        get: function () { return instancePropertyGet(this, "urls"); },
        set: function (value) { instancePropertySet(this, "urls", value); },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
export { Contact };
var ContactName = /** @class */ (function () {
    function ContactName(formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix) {
        this.formatted = formatted;
        this.familyName = familyName;
        this.givenName = givenName;
        this.middleName = middleName;
        this.honorificPrefix = honorificPrefix;
        this.honorificSuffix = honorificSuffix;
    }
    return ContactName;
}());
export { ContactName };
var ContactField = /** @class */ (function () {
    function ContactField(type, value, pref) {
        this.type = type;
        this.value = value;
        this.pref = pref;
    }
    return ContactField;
}());
export { ContactField };
var ContactAddress = /** @class */ (function () {
    function ContactAddress(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
        this.pref = pref;
        this.type = type;
        this.formatted = formatted;
        this.streetAddress = streetAddress;
        this.locality = locality;
        this.region = region;
        this.postalCode = postalCode;
        this.country = country;
    }
    return ContactAddress;
}());
export { ContactAddress };
var ContactOrganization = /** @class */ (function () {
    function ContactOrganization(type, name, department, title, pref) {
        this.type = type;
        this.name = name;
        this.department = department;
        this.title = title;
        this.pref = pref;
    }
    return ContactOrganization;
}());
export { ContactOrganization };
var ContactFindOptions = /** @class */ (function () {
    function ContactFindOptions(filter, multiple, desiredFields, hasPhoneNumber) {
        this.filter = filter;
        this.multiple = multiple;
        this.desiredFields = desiredFields;
        this.hasPhoneNumber = hasPhoneNumber;
    }
    return ContactFindOptions;
}());
export { ContactFindOptions };
var Contacts = /** @class */ (function (_super) {
    __extends(Contacts, _super);
    function Contacts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a single contact.
     * @returns {Contact} Returns a Contact object
     */
    Contacts.prototype.create = function () {
        return new Contact();
    };
    Contacts.prototype.find = function (fields, options) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve, reject) {
                    navigator.contacts.find(fields, function (contacts) {
                        resolve(contacts.map(processContact));
                    }, reject, options);
                });
            }
        })();
    };
    Contacts.prototype.pickContact = function () {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve, reject) {
                    navigator.contacts.pickContact(function (contact) { return resolve(processContact(contact)); }, reject);
                });
            }
        })();
    };
    Contacts.pluginName = "Contacts";
    Contacts.plugin = "cordova-plugin-contacts";
    Contacts.pluginRef = "navigator.contacts";
    Contacts.repo = "https://github.com/apache/cordova-plugin-contacts";
    Contacts.platforms = ["Android", "BlackBerry 10", "Browser", "Firefox OS", "iOS", "Ubuntu", "Windows", "Windows 8", "Windows Phone"];
    return Contacts;
}(IonicNativePlugin));
export { Contacts };
/**
 * @hidden
 */
function processContact(contact) {
    var newContact = new Contact();
    for (var prop in contact) {
        if (typeof contact[prop] === 'function')
            continue;
        newContact[prop] = contact[prop];
    }
    return newContact;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLHlIQVFMLFVBQVUsRUFDWCxNQUFNLG9CQUFvQixDQUFDOztJQXVHMUI7UUFDRSxJQUNFLGlCQUFpQixDQUFDLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQ3RFO1lBQ0EsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUdELHVCQUFLOzs7c0RBQVk7Z0JBQ2YsSUFBTSxVQUFVLEdBQVEsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDdEMsS0FBSyxJQUFNLElBQUksSUFBSSxLQUFJLEVBQUU7b0JBQ3ZCLElBQUksSUFBSSxLQUFLLElBQUk7d0JBQUUsT0FBTztvQkFDMUIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDL0I7Z0JBQ0QsT0FBTyxVQUFVLENBQUM7YUFDbkI7OztJQUdELHdCQUFNO0lBS04sc0JBQUk7OztzREFBaUI7Z0JBQ25CLE9BQU8sVUFBVSxDQUFDLFVBQUMsT0FBaUIsRUFBRSxNQUFnQjtvQkFDcEQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFZO3dCQUNyQyxLQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEtBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7YUFDSjs7OzBCQWpEbUIsdUJBQUU7Ozs7OzswQkFDRixnQ0FBVzs7Ozs7OzBCQUNYLHlCQUFJOzs7Ozs7MEJBQ0osNkJBQVE7Ozs7Ozsw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Z0MsRUFDbEQsTUFBTSxDQUNQLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7YUFDSjs7Ozs7Ozs7bUJBalpIO0VBcVc4QixpQkFBaUI7U0FBbEMsUUFBUTtBQStDckI7O0dBRUc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxPQUFZO0lBQ2xDLElBQU0sVUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDakMsS0FBSyxJQUFNLElBQUksSUFBSSxPQUFPLEVBQUU7UUFDMUIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVO1lBQUUsU0FBUztRQUNsRCxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvcmRvdmFDaGVjayxcbiAgQ29yZG92YUluc3RhbmNlLFxuICBJbnN0YW5jZUNoZWNrLFxuICBJbnN0YW5jZVByb3BlcnR5LFxuICBJb25pY05hdGl2ZVBsdWdpbixcbiAgUGx1Z2luLFxuICBjaGVja0F2YWlsYWJpbGl0eSxcbiAgZ2V0UHJvbWlzZVxufSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogYW55LCBuYXZpZ2F0b3I6IGFueTtcblxuZXhwb3J0IHR5cGUgQ29udGFjdEZpZWxkVHlwZSA9XG4gIHwgJyonXG4gIHwgJ2FkZHJlc3NlcydcbiAgfCAnYmlydGhkYXknXG4gIHwgJ2NhdGVnb3JpZXMnXG4gIHwgJ2NvdW50cnknXG4gIHwgJ2RlcGFydG1lbnQnXG4gIHwgJ2Rpc3BsYXlOYW1lJ1xuICB8ICdlbWFpbHMnXG4gIHwgJ25hbWUuZmFtaWx5TmFtZSdcbiAgfCAnbmFtZS5mb3JtYXR0ZWQnXG4gIHwgJ25hbWUuZ2l2ZW5OYW1lJ1xuICB8ICduYW1lLmhvbm9yaWZpY1ByZWZpeCdcbiAgfCAnbmFtZS5ob25vcmlmaWNTdWZmaXgnXG4gIHwgJ2lkJ1xuICB8ICdpbXMnXG4gIHwgJ2xvY2FsaXR5J1xuICB8ICduYW1lLm1pZGRsZU5hbWUnXG4gIHwgJ25hbWUnXG4gIHwgJ25pY2tuYW1lJ1xuICB8ICdub3RlJ1xuICB8ICdvcmdhbml6YXRpb25zJ1xuICB8ICdwaG9uZU51bWJlcnMnXG4gIHwgJ3Bob3RvcydcbiAgfCAncG9zdGFsQ29kZSdcbiAgfCAncmVnaW9uJ1xuICB8ICdzdHJlZXRBZGRyZXNzJ1xuICB8ICd0aXRsZSdcbiAgfCAndXJscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRhY3RQcm9wZXJ0aWVzIHtcbiAgLyoqIEEgZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXIuICovXG4gIGlkPzogc3RyaW5nO1xuXG4gIC8qKiBBIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyIG9uIEFuZHJvaWQuICovXG4gIHJhd0lkPzogc3RyaW5nO1xuXG4gIC8qKiBUaGUgbmFtZSBvZiB0aGlzIENvbnRhY3QsIHN1aXRhYmxlIGZvciBkaXNwbGF5IHRvIGVuZCB1c2Vycy4gKi9cbiAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG5cbiAgLyoqIEFuIG9iamVjdCBjb250YWluaW5nIGFsbCBjb21wb25lbnRzIG9mIGEgcGVyc29ucyBuYW1lLiAqL1xuICBuYW1lPzogSUNvbnRhY3ROYW1lO1xuXG4gIC8qKiBBIGNhc3VhbCBuYW1lIGJ5IHdoaWNoIHRvIGFkZHJlc3MgdGhlIGNvbnRhY3QuICovXG4gIG5pY2tuYW1lPzogc3RyaW5nO1xuXG4gIC8qKiBBbiBhcnJheSBvZiBhbGwgdGhlIGNvbnRhY3QncyBwaG9uZSBudW1iZXJzLiAqL1xuICBwaG9uZU51bWJlcnM/OiBJQ29udGFjdEZpZWxkW107XG5cbiAgLyoqIEFuIGFycmF5IG9mIGFsbCB0aGUgY29udGFjdCdzIGVtYWlsIGFkZHJlc3Nlcy4gKi9cbiAgZW1haWxzPzogSUNvbnRhY3RGaWVsZFtdO1xuXG4gIC8qKiBBbiBhcnJheSBvZiBhbGwgdGhlIGNvbnRhY3QncyBhZGRyZXNzZXMuICovXG4gIGFkZHJlc3Nlcz86IElDb250YWN0QWRkcmVzc1tdO1xuXG4gIC8qKiBBbiBhcnJheSBvZiBhbGwgdGhlIGNvbnRhY3QncyBJTSBhZGRyZXNzZXMuICovXG4gIGltcz86IElDb250YWN0RmllbGRbXTtcblxuICAvKiogQW4gYXJyYXkgb2YgYWxsIHRoZSBjb250YWN0J3Mgb3JnYW5pemF0aW9ucy4gKi9cbiAgb3JnYW5pemF0aW9ucz86IElDb250YWN0T3JnYW5pemF0aW9uW107XG5cbiAgLyoqIFRoZSBiaXJ0aGRheSBvZiB0aGUgY29udGFjdC4gKi9cbiAgYmlydGhkYXk/OiBEYXRlO1xuXG4gIC8qKiBBIG5vdGUgYWJvdXQgdGhlIGNvbnRhY3QuICovXG4gIG5vdGU/OiBzdHJpbmc7XG5cbiAgLyoqIEFuIGFycmF5IG9mIHRoZSBjb250YWN0J3MgcGhvdG9zLiAqL1xuICBwaG90b3M/OiBJQ29udGFjdEZpZWxkW107XG5cbiAgLyoqIEFuIGFycmF5IG9mIGFsbCB0aGUgdXNlci1kZWZpbmVkIGNhdGVnb3JpZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb250YWN0LiAqL1xuICBjYXRlZ29yaWVzPzogSUNvbnRhY3RGaWVsZFtdO1xuXG4gIC8qKiBBbiBhcnJheSBvZiB3ZWIgcGFnZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb250YWN0LiAqL1xuICB1cmxzPzogSUNvbnRhY3RGaWVsZFtdO1xufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRhY3QgaW1wbGVtZW50cyBJQ29udGFjdFByb3BlcnRpZXMge1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIGlkOiBzdHJpbmc7XG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgQEluc3RhbmNlUHJvcGVydHkoKSBuYW1lOiBJQ29udGFjdE5hbWU7XG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgbmlja25hbWU6IHN0cmluZztcbiAgQEluc3RhbmNlUHJvcGVydHkoKSBwaG9uZU51bWJlcnM6IElDb250YWN0RmllbGRbXTtcbiAgQEluc3RhbmNlUHJvcGVydHkoKSBlbWFpbHM6IElDb250YWN0RmllbGRbXTtcbiAgQEluc3RhbmNlUHJvcGVydHkoKSBhZGRyZXNzZXM6IElDb250YWN0QWRkcmVzc1tdO1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIGltczogSUNvbnRhY3RGaWVsZFtdO1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIG9yZ2FuaXphdGlvbnM6IElDb250YWN0T3JnYW5pemF0aW9uW107XG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgYmlydGhkYXk6IERhdGU7XG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgbm90ZTogc3RyaW5nO1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIHBob3RvczogSUNvbnRhY3RGaWVsZFtdO1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIGNhdGVnb3JpZXM6IElDb250YWN0RmllbGRbXTtcbiAgQEluc3RhbmNlUHJvcGVydHkoKSB1cmxzOiBJQ29udGFjdEZpZWxkW107XG4gIHByaXZhdGUgX29iamVjdEluc3RhbmNlOiBhbnk7XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChcbiAgICAgIGNoZWNrQXZhaWxhYmlsaXR5KCduYXZpZ2F0b3IuY29udGFjdHMnLCAnY3JlYXRlJywgJ0NvbnRhY3RzJykgPT09IHRydWVcbiAgICApIHtcbiAgICAgIHRoaXMuX29iamVjdEluc3RhbmNlID0gbmF2aWdhdG9yLmNvbnRhY3RzLmNyZWF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnN0YW5jZUNoZWNrKClcbiAgY2xvbmUoKTogQ29udGFjdCB7XG4gICAgY29uc3QgbmV3Q29udGFjdDogYW55ID0gbmV3IENvbnRhY3QoKTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcykge1xuICAgICAgaWYgKHByb3AgPT09ICdpZCcpIHJldHVybjtcbiAgICAgIG5ld0NvbnRhY3RbcHJvcF0gPSB0aGlzW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gbmV3Q29udGFjdDtcbiAgfVxuXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICByZW1vdmUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICBASW5zdGFuY2VDaGVjaygpXG4gIHNhdmUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gZ2V0UHJvbWlzZSgocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuX29iamVjdEluc3RhbmNlLnNhdmUoKGNvbnRhY3Q6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9vYmplY3RJbnN0YW5jZSA9IGNvbnRhY3Q7XG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9LCByZWplY3QpO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb250YWN0RXJyb3Ige1xuICAvKiogRXJyb3IgY29kZSAqL1xuICBjb2RlOiBudW1iZXI7XG4gIC8qKiBFcnJvciBtZXNzYWdlICovXG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IENvbnRhY3RFcnJvcjoge1xuICBuZXcgKGNvZGU6IG51bWJlcik6IElDb250YWN0RXJyb3I7XG4gIFVOS05PV05fRVJST1I6IG51bWJlcjtcbiAgSU5WQUxJRF9BUkdVTUVOVF9FUlJPUjogbnVtYmVyO1xuICBUSU1FT1VUX0VSUk9SOiBudW1iZXI7XG4gIFBFTkRJTkdfT1BFUkFUSU9OX0VSUk9SOiBudW1iZXI7XG4gIElPX0VSUk9SOiBudW1iZXI7XG4gIE5PVF9TVVBQT1JURURfRVJST1I6IG51bWJlcjtcbiAgUEVSTUlTU0lPTl9ERU5JRURfRVJST1I6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRhY3ROYW1lIHtcbiAgLyoqIFRoZSBjb21wbGV0ZSBuYW1lIG9mIHRoZSBjb250YWN0LiAqL1xuICBmb3JtYXR0ZWQ/OiBzdHJpbmc7XG4gIC8qKiBUaGUgY29udGFjdCdzIGZhbWlseSBuYW1lLiAqL1xuICBmYW1pbHlOYW1lPzogc3RyaW5nO1xuICAvKiogVGhlIGNvbnRhY3QncyBnaXZlbiBuYW1lLiAqL1xuICBnaXZlbk5hbWU/OiBzdHJpbmc7XG4gIC8qKiBUaGUgY29udGFjdCdzIG1pZGRsZSBuYW1lLiAqL1xuICBtaWRkbGVOYW1lPzogc3RyaW5nO1xuICAvKiogVGhlIGNvbnRhY3QncyBwcmVmaXggKGV4YW1wbGUgTXIuIG9yIERyLikgKi9cbiAgaG9ub3JpZmljUHJlZml4Pzogc3RyaW5nO1xuICAvKiogVGhlIGNvbnRhY3QncyBzdWZmaXggKGV4YW1wbGUgRXNxLikuICovXG4gIGhvbm9yaWZpY1N1ZmZpeD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250YWN0TmFtZSBpbXBsZW1lbnRzIElDb250YWN0TmFtZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBmb3JtYXR0ZWQ/OiBzdHJpbmcsXG4gICAgcHVibGljIGZhbWlseU5hbWU/OiBzdHJpbmcsXG4gICAgcHVibGljIGdpdmVuTmFtZT86IHN0cmluZyxcbiAgICBwdWJsaWMgbWlkZGxlTmFtZT86IHN0cmluZyxcbiAgICBwdWJsaWMgaG9ub3JpZmljUHJlZml4Pzogc3RyaW5nLFxuICAgIHB1YmxpYyBob25vcmlmaWNTdWZmaXg/OiBzdHJpbmdcbiAgKSB7fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb250YWN0RmllbGQge1xuICAvKiogQSBzdHJpbmcgdGhhdCBpbmRpY2F0ZXMgd2hhdCB0eXBlIG9mIGZpZWxkIHRoaXMgaXMsIGhvbWUgZm9yIGV4YW1wbGUuICovXG4gIHR5cGU/OiBzdHJpbmc7XG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGZpZWxkLCBzdWNoIGFzIGEgcGhvbmUgbnVtYmVyIG9yIGVtYWlsIGFkZHJlc3MuICovXG4gIHZhbHVlPzogc3RyaW5nO1xuICAvKiogU2V0IHRvIHRydWUgaWYgdGhpcyBDb250YWN0RmllbGQgY29udGFpbnMgdGhlIHVzZXIncyBwcmVmZXJyZWQgdmFsdWUuICovXG4gIHByZWY/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRhY3RGaWVsZCBpbXBsZW1lbnRzIElDb250YWN0RmllbGQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdHlwZT86IHN0cmluZyxcbiAgICBwdWJsaWMgdmFsdWU/OiBzdHJpbmcsXG4gICAgcHVibGljIHByZWY/OiBib29sZWFuXG4gICkge31cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29udGFjdEFkZHJlc3Mge1xuICAvKiogU2V0IHRvIHRydWUgaWYgdGhpcyBDb250YWN0QWRkcmVzcyBjb250YWlucyB0aGUgdXNlcidzIHByZWZlcnJlZCB2YWx1ZS4gKi9cbiAgcHJlZj86IGJvb2xlYW47XG4gIC8qKiBBIHN0cmluZyBpbmRpY2F0aW5nIHdoYXQgdHlwZSBvZiBmaWVsZCB0aGlzIGlzLCBob21lIGZvciBleGFtcGxlLiAqL1xuICB0eXBlPzogc3RyaW5nO1xuICAvKiogVGhlIGZ1bGwgYWRkcmVzcyBmb3JtYXR0ZWQgZm9yIGRpc3BsYXkuICovXG4gIGZvcm1hdHRlZD86IHN0cmluZztcbiAgLyoqIFRoZSBmdWxsIHN0cmVldCBhZGRyZXNzLiAqL1xuICBzdHJlZXRBZGRyZXNzPzogc3RyaW5nO1xuICAvKiogVGhlIGNpdHkgb3IgbG9jYWxpdHkuICovXG4gIGxvY2FsaXR5Pzogc3RyaW5nO1xuICAvKiogVGhlIHN0YXRlIG9yIHJlZ2lvbi4gKi9cbiAgcmVnaW9uPzogc3RyaW5nO1xuICAvKiogVGhlIHppcCBjb2RlIG9yIHBvc3RhbCBjb2RlLiAqL1xuICBwb3N0YWxDb2RlPzogc3RyaW5nO1xuICAvKiogVGhlIGNvdW50cnkgbmFtZS4gKi9cbiAgY291bnRyeT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250YWN0QWRkcmVzcyBpbXBsZW1lbnRzIElDb250YWN0QWRkcmVzcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwcmVmPzogYm9vbGVhbixcbiAgICBwdWJsaWMgdHlwZT86IHN0cmluZyxcbiAgICBwdWJsaWMgZm9ybWF0dGVkPzogc3RyaW5nLFxuICAgIHB1YmxpYyBzdHJlZXRBZGRyZXNzPzogc3RyaW5nLFxuICAgIHB1YmxpYyBsb2NhbGl0eT86IHN0cmluZyxcbiAgICBwdWJsaWMgcmVnaW9uPzogc3RyaW5nLFxuICAgIHB1YmxpYyBwb3N0YWxDb2RlPzogc3RyaW5nLFxuICAgIHB1YmxpYyBjb3VudHJ5Pzogc3RyaW5nXG4gICkge31cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29udGFjdE9yZ2FuaXphdGlvbiB7XG4gIC8qKiBTZXQgdG8gdHJ1ZSBpZiB0aGlzIENvbnRhY3RPcmdhbml6YXRpb24gY29udGFpbnMgdGhlIHVzZXIncyBwcmVmZXJyZWQgdmFsdWUuICovXG4gIHByZWY/OiBib29sZWFuO1xuICAvKiogQSBzdHJpbmcgdGhhdCBpbmRpY2F0ZXMgd2hhdCB0eXBlIG9mIGZpZWxkIHRoaXMgaXMsIGhvbWUgZm9yIGV4YW1wbGUuICovXG4gIHR5cGU/OiBzdHJpbmc7XG4gIC8qKiBUaGUgbmFtZSBvZiB0aGUgb3JnYW5pemF0aW9uLiAqL1xuICBuYW1lPzogc3RyaW5nO1xuICAvKiogVGhlIGRlcGFydG1lbnQgdGhlIGNvbnRyYWN0IHdvcmtzIGZvci4gKi9cbiAgZGVwYXJ0bWVudD86IHN0cmluZztcbiAgLyoqIFRoZSBjb250YWN0J3MgdGl0bGUgYXQgdGhlIG9yZ2FuaXphdGlvbi4gKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udGFjdE9yZ2FuaXphdGlvbiBpbXBsZW1lbnRzIElDb250YWN0T3JnYW5pemF0aW9uIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHR5cGU/OiBzdHJpbmcsXG4gICAgcHVibGljIG5hbWU/OiBzdHJpbmcsXG4gICAgcHVibGljIGRlcGFydG1lbnQ/OiBzdHJpbmcsXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nLFxuICAgIHB1YmxpYyBwcmVmPzogYm9vbGVhblxuICApIHt9XG59XG5cbi8qKiBTZWFyY2ggb3B0aW9ucyB0byBmaWx0ZXIgbmF2aWdhdG9yLmNvbnRhY3RzLiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRhY3RGaW5kT3B0aW9ucyB7XG4gIC8qKiBUaGUgc2VhcmNoIHN0cmluZyB1c2VkIHRvIGZpbmQgbmF2aWdhdG9yLmNvbnRhY3RzLiAqL1xuICBmaWx0ZXI/OiBzdHJpbmc7XG4gIC8qKiBEZXRlcm1pbmVzIGlmIHRoZSBmaW5kIG9wZXJhdGlvbiByZXR1cm5zIG11bHRpcGxlIG5hdmlnYXRvci5jb250YWN0cy4gRGVmYXVsdHMgdG8gZmFsc2UuICovXG4gIG11bHRpcGxlPzogYm9vbGVhbjtcbiAgLyoqIENvbnRhY3QgZmllbGRzIHRvIGJlIHJldHVybmVkIGJhY2suIElmIHNwZWNpZmllZCwgdGhlIHJlc3VsdGluZyBDb250YWN0IG9iamVjdCBvbmx5IGZlYXR1cmVzIHZhbHVlcyBmb3IgdGhlc2UgZmllbGRzLiAqL1xuICBkZXNpcmVkRmllbGRzPzogc3RyaW5nW107XG4gIC8qKlxuICAgKiAoQW5kcm9pZCBvbmx5KTogRmlsdGVycyB0aGUgc2VhcmNoIHRvIG9ubHkgcmV0dXJuIGNvbnRhY3RzIHdpdGggYSBwaG9uZSBudW1iZXIgaW5mb3JtZWQuXG4gICAqL1xuICBoYXNQaG9uZU51bWJlcj86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udGFjdEZpbmRPcHRpb25zIGltcGxlbWVudHMgSUNvbnRhY3RGaW5kT3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBmaWx0ZXI/OiBzdHJpbmcsXG4gICAgcHVibGljIG11bHRpcGxlPzogYm9vbGVhbixcbiAgICBwdWJsaWMgZGVzaXJlZEZpZWxkcz86IHN0cmluZ1tdLFxuICAgIHB1YmxpYyBoYXNQaG9uZU51bWJlcj86IGJvb2xlYW5cbiAgKSB7fVxufVxuXG4vKipcbiAqIEBuYW1lIENvbnRhY3RzXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFjY2VzcyBhbmQgbWFuYWdlIENvbnRhY3RzIG9uIHRoZSBkZXZpY2UuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIEB1c2FnZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbnRhY3RzLCBDb250YWN0LCBDb250YWN0RmllbGQsIENvbnRhY3ROYW1lIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb250YWN0cy9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFjdHM6IENvbnRhY3RzKSB7IH1cbiAqXG4gKiBsZXQgY29udGFjdDogQ29udGFjdCA9IHRoaXMuY29udGFjdHMuY3JlYXRlKCk7XG4gKlxuICogY29udGFjdC5uYW1lID0gbmV3IENvbnRhY3ROYW1lKG51bGwsICdTbWl0aCcsICdKb2huJyk7XG4gKiBjb250YWN0LnBob25lTnVtYmVycyA9IFtuZXcgQ29udGFjdEZpZWxkKCdtb2JpbGUnLCAnNjQ3MTIzNDU2NycpXTtcbiAqIGNvbnRhY3Quc2F2ZSgpLnRoZW4oXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCdDb250YWN0IHNhdmVkIScsIGNvbnRhY3QpLFxuICogICAoZXJyb3I6IGFueSkgPT4gY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIGNvbnRhY3QuJywgZXJyb3IpXG4gKiApO1xuICpcbiAqIGBgYFxuICogQGNsYXNzZXNcbiAqIENvbnRhY3RcbiAqIEBpbnRlcmZhY2VzXG4gKiBJQ29udGFjdFByb3BlcnRpZXNcbiAqIElDb250YWN0RXJyb3JcbiAqIElDb250YWN0TmFtZVxuICogSUNvbnRhY3RGaWVsZFxuICogSUNvbnRhY3RBZGRyZXNzXG4gKiBJQ29udGFjdE9yZ2FuaXphdGlvblxuICogSUNvbnRhY3RGaW5kT3B0aW9uc1xuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0NvbnRhY3RzJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tY29udGFjdHMnLFxuICBwbHVnaW5SZWY6ICduYXZpZ2F0b3IuY29udGFjdHMnLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2FwYWNoZS9jb3Jkb3ZhLXBsdWdpbi1jb250YWN0cycsXG4gIHBsYXRmb3JtczogW1xuICAgICdBbmRyb2lkJyxcbiAgICAnQmxhY2tCZXJyeSAxMCcsXG4gICAgJ0Jyb3dzZXInLFxuICAgICdGaXJlZm94IE9TJyxcbiAgICAnaU9TJyxcbiAgICAnVWJ1bnR1JyxcbiAgICAnV2luZG93cycsXG4gICAgJ1dpbmRvd3MgOCcsXG4gICAgJ1dpbmRvd3MgUGhvbmUnXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29udGFjdHMgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzaW5nbGUgY29udGFjdC5cbiAgICogQHJldHVybnMge0NvbnRhY3R9IFJldHVybnMgYSBDb250YWN0IG9iamVjdFxuICAgKi9cbiAgY3JlYXRlKCk6IENvbnRhY3Qge1xuICAgIHJldHVybiBuZXcgQ29udGFjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBmb3IgY29udGFjdHMgaW4gdGhlIENvbnRhY3RzIGxpc3QuXG4gICAqIEBwYXJhbSB7Q29udGFjdEZpZWxkVHlwZVtdfSBmaWVsZHMgQ29udGFjdCBmaWVsZHMgdG8gYmUgdXNlZCBhcyBhIHNlYXJjaCBxdWFsaWZpZXJcbiAgICogQHBhcmFtIHtJQ29udGFjdEZpbmRPcHRpb25zfSBbb3B0aW9uc10gT3B0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIHF1ZXJ5XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENvbnRhY3RbXT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VhcmNoIHJlc3VsdHMgKGFuIGFycmF5IG9mIENvbnRhY3Qgb2JqZWN0cylcbiAgICovXG4gIEBDb3Jkb3ZhQ2hlY2soKVxuICBmaW5kKFxuICAgIGZpZWxkczogQ29udGFjdEZpZWxkVHlwZVtdLFxuICAgIG9wdGlvbnM/OiBJQ29udGFjdEZpbmRPcHRpb25zXG4gICk6IFByb21pc2U8Q29udGFjdFtdPiB7XG4gICAgcmV0dXJuIGdldFByb21pc2UoKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICBuYXZpZ2F0b3IuY29udGFjdHMuZmluZChcbiAgICAgICAgZmllbGRzLFxuICAgICAgICAoY29udGFjdHM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShjb250YWN0cy5tYXAocHJvY2Vzc0NvbnRhY3QpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhIHNpbmdsZSBDb250YWN0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb250YWN0Pn0gUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZWxlY3RlZCBDb250YWN0XG4gICAqL1xuICBAQ29yZG92YUNoZWNrKClcbiAgcGlja0NvbnRhY3QoKTogUHJvbWlzZTxDb250YWN0PiB7XG4gICAgcmV0dXJuIGdldFByb21pc2UoKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICBuYXZpZ2F0b3IuY29udGFjdHMucGlja0NvbnRhY3QoXG4gICAgICAgIChjb250YWN0OiBhbnkpID0+IHJlc29sdmUocHJvY2Vzc0NvbnRhY3QoY29udGFjdCkpLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NDb250YWN0KGNvbnRhY3Q6IGFueSkge1xuICBjb25zdCBuZXdDb250YWN0ID0gbmV3IENvbnRhY3QoKTtcbiAgZm9yIChjb25zdCBwcm9wIGluIGNvbnRhY3QpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRhY3RbcHJvcF0gPT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xuICAgIG5ld0NvbnRhY3RbcHJvcF0gPSBjb250YWN0W3Byb3BdO1xuICB9XG4gIHJldHVybiBuZXdDb250YWN0O1xufVxuIl19