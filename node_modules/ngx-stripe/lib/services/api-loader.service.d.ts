import { Observable, BehaviorSubject } from 'rxjs';
import { WindowRef } from './window-ref.service';
import { DocumentRef } from './document-ref.service';
export interface Status {
    loaded: boolean;
    loading: boolean;
    error: boolean;
}
export declare class LazyStripeAPILoader {
    platformId: any;
    window: WindowRef;
    document: DocumentRef;
    status: BehaviorSubject<Status>;
    constructor(platformId: any, window: WindowRef, document: DocumentRef);
    asStream(): Observable<Status>;
    isReady(): boolean;
    load(): void;
}
