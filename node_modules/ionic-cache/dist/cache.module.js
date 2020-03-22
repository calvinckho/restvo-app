import { NgModule, InjectionToken } from '@angular/core';
import { CacheService } from './cache.service';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { CacheStorageService } from './cache-storage';
export var CONFIG = new InjectionToken('CONFIG');
var cacheConfigDefaults = {
    keyPrefix: ''
};
export function buildCacheService(storage, cacheConfig) {
    cacheConfig = Object.assign(cacheConfigDefaults, cacheConfig);
    return new CacheService(new CacheStorageService(storage, cacheConfig.keyPrefix));
}
var CacheModule = /** @class */ (function () {
    function CacheModule() {
    }
    CacheModule.forRoot = function (cacheConfig) {
        return {
            ngModule: CacheModule,
            providers: [
                { provide: CONFIG, useValue: cacheConfig },
                {
                    provide: CacheService,
                    useFactory: buildCacheService,
                    deps: [Storage, CONFIG]
                }
            ]
        };
    };
    CacheModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicStorageModule.forRoot({
                            name: '__ionicCache',
                            driverOrder: ['indexeddb', 'sqlite', 'websql']
                        })
                    ]
                },] },
    ];
    return CacheModule;
}());
export { CacheModule };
//# sourceMappingURL=cache.module.js.map