import { Options } from '../interfaces/stripe';
import { LazyStripeAPILoader } from './api-loader.service';
import { WindowRef } from './window-ref.service';
import { StripeInstance } from './stripe-instance.class';
export declare class StripeFactoryService {
    baseKey: string;
    baseOptions: string;
    loader: LazyStripeAPILoader;
    window: WindowRef;
    constructor(baseKey: string, baseOptions: string, loader: LazyStripeAPILoader, window: WindowRef);
    create(key: string, options?: Options): StripeInstance;
}
