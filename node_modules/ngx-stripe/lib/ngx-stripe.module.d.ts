import { ModuleWithProviders } from '@angular/core';
import { Options } from './interfaces/stripe';
export declare class NgxStripeModule {
    static forRoot(publishableKey?: string, options?: Options): ModuleWithProviders;
    static forChild(publishableKey?: string, options?: Options): ModuleWithProviders;
}
