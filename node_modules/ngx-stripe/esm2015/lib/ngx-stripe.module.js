/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { LazyStripeAPILoader } from './services/api-loader.service';
import { StripeService } from './services/stripe.service';
import { StripeFactoryService } from './services/stripe-factory.service';
import { WindowRef } from './services/window-ref.service';
import { DocumentRef } from './services/document-ref.service';
import { STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY } from './interfaces/stripe';
import { StripeCardComponent } from './components/stripe-card.component';
export class NgxStripeModule {
    /**
     * @param {?=} publishableKey
     * @param {?=} options
     * @return {?}
     */
    static forRoot(publishableKey, options) {
        return {
            ngModule: NgxStripeModule,
            providers: [
                LazyStripeAPILoader,
                StripeService,
                StripeFactoryService,
                WindowRef,
                DocumentRef,
                {
                    provide: STRIPE_PUBLISHABLE_KEY,
                    useValue: publishableKey
                },
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ]
        };
    }
    /**
     * @param {?=} publishableKey
     * @param {?=} options
     * @return {?}
     */
    static forChild(publishableKey, options) {
        return {
            ngModule: NgxStripeModule,
            providers: [
                LazyStripeAPILoader,
                StripeService,
                StripeFactoryService,
                WindowRef,
                DocumentRef,
                {
                    provide: STRIPE_PUBLISHABLE_KEY,
                    useValue: publishableKey
                },
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ]
        };
    }
}
NgxStripeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [StripeCardComponent],
                exports: [StripeCardComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXN0cmlwZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc3RyaXBlLyIsInNvdXJjZXMiOlsibGliL25neC1zdHJpcGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RCxPQUFPLEVBRUwsY0FBYyxFQUNkLHNCQUFzQixFQUN2QixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBTXpFLE1BQU0sT0FBTyxlQUFlOzs7Ozs7SUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FDbkIsY0FBdUIsRUFDdkIsT0FBaUI7UUFFakIsT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7Z0JBQ25CLGFBQWE7Z0JBQ2Isb0JBQW9CO2dCQUNwQixTQUFTO2dCQUNULFdBQVc7Z0JBQ1g7b0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtvQkFDL0IsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUNwQixjQUF1QixFQUN2QixPQUFpQjtRQUVqQixPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULG1CQUFtQjtnQkFDbkIsYUFBYTtnQkFDYixvQkFBb0I7Z0JBQ3BCLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWDtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsY0FBYztpQkFDekI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxPQUFPO2lCQUNsQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQW5ERixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGF6eVN0cmlwZUFQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvYXBpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmlwZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0cmlwZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmlwZUZhY3RvcnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdHJpcGUtZmFjdG9yeS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9jdW1lbnRSZWYgfSBmcm9tICcuL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgT3B0aW9ucyxcbiAgU1RSSVBFX09QVElPTlMsXG4gIFNUUklQRV9QVUJMSVNIQUJMRV9LRVlcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3N0cmlwZSc7XG5pbXBvcnQgeyBTdHJpcGVDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0cmlwZS1jYXJkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1N0cmlwZUNhcmRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU3RyaXBlQ2FyZENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4U3RyaXBlTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KFxuICAgIHB1Ymxpc2hhYmxlS2V5Pzogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBPcHRpb25zXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4U3RyaXBlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIExhenlTdHJpcGVBUElMb2FkZXIsXG4gICAgICAgIFN0cmlwZVNlcnZpY2UsXG4gICAgICAgIFN0cmlwZUZhY3RvcnlTZXJ2aWNlLFxuICAgICAgICBXaW5kb3dSZWYsXG4gICAgICAgIERvY3VtZW50UmVmLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RSSVBFX1BVQkxJU0hBQkxFX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogcHVibGlzaGFibGVLZXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChcbiAgICBwdWJsaXNoYWJsZUtleT86IHN0cmluZyxcbiAgICBvcHRpb25zPzogT3B0aW9uc1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neFN0cmlwZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBMYXp5U3RyaXBlQVBJTG9hZGVyLFxuICAgICAgICBTdHJpcGVTZXJ2aWNlLFxuICAgICAgICBTdHJpcGVGYWN0b3J5U2VydmljZSxcbiAgICAgICAgV2luZG93UmVmLFxuICAgICAgICBEb2N1bWVudFJlZixcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUUklQRV9QVUJMSVNIQUJMRV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IHB1Ymxpc2hhYmxlS2V5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVFJJUEVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9uc1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19