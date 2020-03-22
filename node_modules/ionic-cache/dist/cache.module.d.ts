import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { CacheConfig, CacheService } from './cache.service';
import { Storage } from '@ionic/storage';
export declare const CONFIG: InjectionToken<CacheConfig>;
export declare function buildCacheService(storage: Storage, cacheConfig: CacheConfig): CacheService;
export declare class CacheModule {
    static forRoot(cacheConfig?: CacheConfig): ModuleWithProviders;
}
