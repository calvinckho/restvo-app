/// <reference types="localforage" />
import { Storage } from '@ionic/storage';
export interface StorageCacheItem {
    key: string;
    value: any;
    expires: number;
    type: string;
    groupKey: string;
}
export declare class CacheStorageService {
    private storage;
    private keyPrefix;
    constructor(storage: Storage, keyPrefix: string);
    ready(): Promise<LocalForage>;
    set(key: string, value: any): Promise<any>;
    remove(key: string): Promise<any>;
    get(key: string): Promise<any>;
    exists(key: string): Promise<boolean>;
    all(): Promise<StorageCacheItem[]>;
    /**
     * @description Returns whether or not an object is a cached item.
     * @return {boolean}
     */
    private isCachedItem(key, item);
    /**
     * Makes sure that the key is prefixed properly
     * @return {string}
     */
    private buildKey(key);
    /**
     * Makes sure that the key isn't prefixed
     * @return {string}
     */
    private debuildKey(key);
}
