var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CacheStorageService = /** @class */ (function () {
    function CacheStorageService(storage, keyPrefix) {
        this.storage = storage;
        this.keyPrefix = keyPrefix;
    }
    CacheStorageService.prototype.ready = function () {
        return this.storage.ready();
    };
    CacheStorageService.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.storage.set(this.buildKey(key), value)];
                }
            });
        });
    };
    CacheStorageService.prototype.remove = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.storage.remove(this.buildKey(key))];
                }
            });
        });
    };
    CacheStorageService.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get(this.buildKey(key))];
                    case 2:
                        value = _a.sent();
                        return [2 /*return*/, !!value ? Object.assign({ key: key }, value) : null];
                }
            });
        });
    };
    CacheStorageService.prototype.exists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get(this.buildKey(key))];
                    case 2: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    CacheStorageService.prototype.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        items = [];
                        return [4 /*yield*/, this.storage.forEach(function (val, key) {
                                if (_this.isCachedItem(key, val)) {
                                    items.push(Object.assign({ key: _this.debuildKey(key) }, val));
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, items];
                }
            });
        });
    };
    /**
     * @description Returns whether or not an object is a cached item.
     * @return {boolean}
     */
    /**
       * @description Returns whether or not an object is a cached item.
       * @return {boolean}
       */
    CacheStorageService.prototype.isCachedItem = /**
       * @description Returns whether or not an object is a cached item.
       * @return {boolean}
       */
    function (key, item) {
        return item && item.expires && item.type && key.startsWith(this.keyPrefix);
    };
    /**
     * Makes sure that the key is prefixed properly
     * @return {string}
     */
    /**
       * Makes sure that the key is prefixed properly
       * @return {string}
       */
    CacheStorageService.prototype.buildKey = /**
       * Makes sure that the key is prefixed properly
       * @return {string}
       */
    function (key) {
        if (key.startsWith(this.keyPrefix)) {
            return key;
        }
        return this.keyPrefix + key;
    };
    /**
     * Makes sure that the key isn't prefixed
     * @return {string}
     */
    /**
       * Makes sure that the key isn't prefixed
       * @return {string}
       */
    CacheStorageService.prototype.debuildKey = /**
       * Makes sure that the key isn't prefixed
       * @return {string}
       */
    function (key) {
        if (key.startsWith(this.keyPrefix)) {
            return key.substr(this.keyPrefix.length);
        }
        return key;
    };
    return CacheStorageService;
}());
export { CacheStorageService };
//# sourceMappingURL=cache-storage.js.map