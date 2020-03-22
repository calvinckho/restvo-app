/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Source() { }
if (false) {
    /** @type {?} */
    Source.prototype.id;
    /** @type {?} */
    Source.prototype.object;
    /** @type {?} */
    Source.prototype.amount;
    /** @type {?} */
    Source.prototype.client_secret;
    /** @type {?|undefined} */
    Source.prototype.code_verification;
    /** @type {?} */
    Source.prototype.created;
    /** @type {?} */
    Source.prototype.currency;
    /** @type {?} */
    Source.prototype.flow;
    /** @type {?} */
    Source.prototype.livemode;
    /** @type {?} */
    Source.prototype.metadata;
    /** @type {?} */
    Source.prototype.three_d_secure;
    /** @type {?} */
    Source.prototype.owner;
    /** @type {?} */
    Source.prototype.receiver;
    /** @type {?} */
    Source.prototype.status;
    /** @type {?} */
    Source.prototype.type;
    /** @type {?} */
    Source.prototype.usage;
}
/**
 * @record
 */
export function SourceParams() { }
if (false) {
    /** @type {?} */
    SourceParams.prototype.id;
    /** @type {?} */
    SourceParams.prototype.client_secret;
}
/**
 * @record
 */
export function SourceData() { }
if (false) {
    /** @type {?|undefined} */
    SourceData.prototype.type;
    /** @type {?|undefined} */
    SourceData.prototype.amount;
    /** @type {?|undefined} */
    SourceData.prototype.currency;
    /** @type {?|undefined} */
    SourceData.prototype.flow;
    /** @type {?|undefined} */
    SourceData.prototype.metadata;
    /** @type {?|undefined} */
    SourceData.prototype.three_d_secure;
    /** @type {?|undefined} */
    SourceData.prototype.owner;
    /** @type {?|undefined} */
    SourceData.prototype.redirect;
    /** @type {?|undefined} */
    SourceData.prototype.token;
    /** @type {?|undefined} */
    SourceData.prototype.usage;
}
/**
 * @param {?} sourceData
 * @return {?}
 */
export function isSourceData(sourceData) {
    return 'type' in sourceData;
}
/**
 * @record
 */
export function SourceResult() { }
if (false) {
    /** @type {?|undefined} */
    SourceResult.prototype.source;
    /** @type {?|undefined} */
    SourceResult.prototype.error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zdHJpcGUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSw0QkFnREM7OztJQS9DQyxvQkFBVzs7SUFDWCx3QkFBaUI7O0lBQ2pCLHdCQUFlOztJQUNmLCtCQUFzQjs7SUFDdEIsbUNBR0U7O0lBQ0YseUJBQWdCOztJQUNoQiwwQkFBaUI7O0lBQ2pCLHNCQUFnQjs7SUFDaEIsMEJBQWtCOztJQUNsQiwwQkFBaUM7O0lBQ2pDLGdDQUVFOztJQUNGLHVCQVNFOztJQUNGLDBCQVVFOztJQUNGLHdCQUFzRTs7SUFDdEUsc0JBT2lCOztJQUNqQix1QkFBa0I7Ozs7O0FBTXBCLGtDQUdDOzs7SUFGQywwQkFBVzs7SUFDWCxxQ0FBc0I7Ozs7O0FBR3hCLGdDQXFCQzs7O0lBcEJDLDBCQUFjOztJQUNkLDRCQUFnQjs7SUFDaEIsOEJBQWtCOztJQUNsQiwwQkFBaUI7O0lBQ2pCLDhCQUFrQzs7SUFDbEMsb0NBRUU7O0lBQ0YsMkJBS0U7O0lBQ0YsOEJBR0U7O0lBQ0YsMkJBQWU7O0lBQ2YsMkJBQW1COzs7Ozs7QUFHckIsTUFBTSxVQUFVLFlBQVksQ0FBQyxVQUFlO0lBQzFDLE9BQU8sTUFBTSxJQUFJLFVBQVUsQ0FBQztBQUM5QixDQUFDOzs7O0FBRUQsa0NBR0M7OztJQUZDLDhCQUFnQjs7SUFDaEIsNkJBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGRyZXNzLCBFcnJvciB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZSB7XG4gIGlkOiBzdHJpbmc7XG4gIG9iamVjdDogJ3NvdXJjZSc7XG4gIGFtb3VudDogbnVtYmVyO1xuICBjbGllbnRfc2VjcmV0OiBzdHJpbmc7XG4gIGNvZGVfdmVyaWZpY2F0aW9uPzoge1xuICAgIGF0dGVtcHRzX3JlbWFpbmluZzogbnVtYmVyO1xuICAgIHN0YXR1czogJ3BlbmRpbmcnIHwgJ3N1Y2NlZGVkJyB8ICdmYWlsZWQnO1xuICB9O1xuICBjcmVhdGVkOiBudW1iZXI7XG4gIGN1cnJlbmN5OiBzdHJpbmc7XG4gIGZsb3c6IEZsb3dUeXBlcztcbiAgbGl2ZW1vZGU6IGJvb2xlYW47XG4gIG1ldGFkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICB0aHJlZV9kX3NlY3VyZToge1xuICAgIGNhcmQ6IHN0cmluZztcbiAgfTtcbiAgb3duZXI6IHtcbiAgICBhZGRyZXNzOiBBZGRyZXNzO1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHBob25lOiBzdHJpbmc7XG4gICAgdmVyaWZpZWRfYWRkcmVzczogQWRkcmVzcztcbiAgICB2ZXJpZmllZF9lbWFpbDogc3RyaW5nO1xuICAgIHZlcmlmaWVkX25hbWU6IHN0cmluZztcbiAgICB2ZXJpZmllZF9waG9uZTogc3RyaW5nO1xuICB9O1xuICByZWNlaXZlcjoge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBhbW91bnRfY2hhcmdlZDogbnVtYmVyO1xuICAgIGFtb3VudF9yZWNlaXZlZDogbnVtYmVyO1xuICAgIGFtb3VudF9yZXR1cm5lZDogbnVtYmVyO1xuICAgIHJlZGlyZWN0Pzoge1xuICAgICAgcmV0dXJuX3VybDogc3RyaW5nO1xuICAgICAgc3RhdHVzOiAncGVuZGluZycgfCAnc3VjY2VlZGVkJyB8ICdmYWlsZWQnO1xuICAgICAgdXJsOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgc3RhdHVzOiAnY2FuY2VsZWQnIHwgJ2NoYXJnZWFibGUnIHwgJ2NvbnN1bWVkJyB8ICdmYWlsZWQnIHwgJ3BlbmRpbmcnO1xuICB0eXBlOlxuICAgIHwgJ2NhcmQnXG4gICAgfCAndGhyZWVfZF9zZWN1cmUnXG4gICAgfCAnZ2lyb3BheSdcbiAgICB8ICdzZXBhX2JpdCdcbiAgICB8ICdpZGVhbCdcbiAgICB8ICdzb2ZvcnQnXG4gICAgfCAnYmFuY29udGFjdCc7XG4gIHVzYWdlOiBVc2FnZVR5cGVzO1xufVxuXG5leHBvcnQgdHlwZSBVc2FnZVR5cGVzID0gJ3JldXNhYmxlJyB8ICdzaW5nbGVfdXNlJztcbmV4cG9ydCB0eXBlIEZsb3dUeXBlcyA9ICdyZWRpcmVjdCcgfCAncmVjZWl2ZXInIHwgJ2NvZGVfdmVyaWZpY2F0aW9uJyB8ICdub25lJztcblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VQYXJhbXMge1xuICBpZDogc3RyaW5nO1xuICBjbGllbnRfc2VjcmV0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlRGF0YSB7XG4gIHR5cGU/OiBzdHJpbmc7XG4gIGFtb3VudD86IG51bWJlcjtcbiAgY3VycmVuY3k/OiBzdHJpbmc7XG4gIGZsb3c/OiBGbG93VHlwZXM7XG4gIG1ldGFkYXRhPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgdGhyZWVfZF9zZWN1cmU/OiB7XG4gICAgY2FyZDogc3RyaW5nO1xuICB9O1xuICBvd25lcj86IHtcbiAgICBhZGRyZXNzPzogQWRkcmVzcztcbiAgICBlbWFpbD86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHBob25lPzogc3RyaW5nO1xuICB9O1xuICByZWRpcmVjdD86IHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG4gICAgcmV0dXJuX3VybDogc3RyaW5nO1xuICB9O1xuICB0b2tlbj86IHN0cmluZztcbiAgdXNhZ2U/OiBVc2FnZVR5cGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTb3VyY2VEYXRhKHNvdXJjZURhdGE6IGFueSk6IHNvdXJjZURhdGEgaXMgU291cmNlRGF0YSB7XG4gIHJldHVybiAndHlwZScgaW4gc291cmNlRGF0YTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VSZXN1bHQge1xuICBzb3VyY2U/OiBTb3VyY2U7XG4gIGVycm9yPzogRXJyb3I7XG59XG4iXX0=