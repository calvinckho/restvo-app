/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Token() { }
if (false) {
    /** @type {?} */
    Token.prototype.id;
    /** @type {?} */
    Token.prototype.object;
    /** @type {?|undefined} */
    Token.prototype.bank_account;
    /** @type {?|undefined} */
    Token.prototype.card;
    /** @type {?} */
    Token.prototype.client_ip;
    /** @type {?} */
    Token.prototype.livemode;
    /** @type {?} */
    Token.prototype.type;
    /** @type {?} */
    Token.prototype.used;
}
/**
 * @record
 */
export function CardDataOptions() { }
if (false) {
    /** @type {?|undefined} */
    CardDataOptions.prototype.name;
    /** @type {?|undefined} */
    CardDataOptions.prototype.address_line1;
    /** @type {?|undefined} */
    CardDataOptions.prototype.address_line2;
    /** @type {?|undefined} */
    CardDataOptions.prototype.address_city;
    /** @type {?|undefined} */
    CardDataOptions.prototype.address_state;
    /** @type {?|undefined} */
    CardDataOptions.prototype.address_zip;
    /** @type {?|undefined} */
    CardDataOptions.prototype.address_country;
    /** @type {?|undefined} */
    CardDataOptions.prototype.currency;
}
/**
 * @record
 */
export function TokenResult() { }
if (false) {
    /** @type {?|undefined} */
    TokenResult.prototype.token;
    /** @type {?|undefined} */
    TokenResult.prototype.error;
}
/**
 * @record
 */
export function Address() { }
if (false) {
    /** @type {?} */
    Address.prototype.line1;
    /** @type {?|undefined} */
    Address.prototype.line2;
    /** @type {?} */
    Address.prototype.city;
    /** @type {?} */
    Address.prototype.state;
    /** @type {?} */
    Address.prototype.postal_code;
}
/**
 * @record
 */
export function DateOfBirth() { }
if (false) {
    /** @type {?} */
    DateOfBirth.prototype.day;
    /** @type {?} */
    DateOfBirth.prototype.month;
    /** @type {?} */
    DateOfBirth.prototype.year;
}
/**
 * @record
 */
export function LegalEntity() { }
if (false) {
    /** @type {?} */
    LegalEntity.prototype.address;
    /** @type {?|undefined} */
    LegalEntity.prototype.address_kana;
    /** @type {?|undefined} */
    LegalEntity.prototype.address_kanji;
    /** @type {?|undefined} */
    LegalEntity.prototype.dob;
    /** @type {?} */
    LegalEntity.prototype.first_name;
    /** @type {?|undefined} */
    LegalEntity.prototype.first_name_kana;
    /** @type {?|undefined} */
    LegalEntity.prototype.first_name_kanji;
    /** @type {?|undefined} */
    LegalEntity.prototype.gender;
    /** @type {?} */
    LegalEntity.prototype.last_name;
    /** @type {?|undefined} */
    LegalEntity.prototype.last_name_kana;
    /** @type {?|undefined} */
    LegalEntity.prototype.last_name_kanji;
    /** @type {?|undefined} */
    LegalEntity.prototype.maiden_name;
    /** @type {?|undefined} */
    LegalEntity.prototype.personal_id_number;
    /** @type {?|undefined} */
    LegalEntity.prototype.phone_number;
    /** @type {?|undefined} */
    LegalEntity.prototype.ssn_last_4;
}
/**
 * @record
 */
export function IndividualEntity() { }
if (false) {
    /** @type {?} */
    IndividualEntity.prototype.type;
}
/**
 * @record
 */
export function BusinessEntity() { }
if (false) {
    /** @type {?} */
    BusinessEntity.prototype.type;
    /** @type {?|undefined} */
    BusinessEntity.prototype.additional_owners;
    /** @type {?} */
    BusinessEntity.prototype.business_name;
    /** @type {?|undefined} */
    BusinessEntity.prototype.business_name_kana;
    /** @type {?|undefined} */
    BusinessEntity.prototype.business_name_kanji;
    /** @type {?|undefined} */
    BusinessEntity.prototype.business_tax_id;
    /** @type {?|undefined} */
    BusinessEntity.prototype.business_vat_id;
    /** @type {?|undefined} */
    BusinessEntity.prototype.personal_address;
    /** @type {?|undefined} */
    BusinessEntity.prototype.personal_address_kana;
    /** @type {?|undefined} */
    BusinessEntity.prototype.personal_address_kanji;
    /** @type {?|undefined} */
    BusinessEntity.prototype.tax_id_registrar;
}
/**
 * @record
 */
export function AccountData() { }
if (false) {
    /** @type {?|undefined} */
    AccountData.prototype.legal_entity;
    /** @type {?|undefined} */
    AccountData.prototype.tos_shown_and_accepted;
}
/**
 * @record
 */
export function BankAccountData() { }
if (false) {
    /** @type {?} */
    BankAccountData.prototype.country;
    /** @type {?} */
    BankAccountData.prototype.currency;
    /** @type {?} */
    BankAccountData.prototype.routing_number;
    /** @type {?} */
    BankAccountData.prototype.account_number;
    /** @type {?|undefined} */
    BankAccountData.prototype.account_holder_name;
    /** @type {?|undefined} */
    BankAccountData.prototype.account_holder_type;
}
/**
 * @record
 */
export function PiiData() { }
if (false) {
    /** @type {?} */
    PiiData.prototype.personal_id_number;
}
/**
 * @param {?} account
 * @return {?}
 */
export function isAccount(account) {
    return account === 'account';
}
/**
 * @param {?} accountData
 * @return {?}
 */
export function isAccountData(accountData) {
    return accountData.legal_entity || accountData.tos_shown_and_accepted;
}
/**
 * @param {?} account
 * @return {?}
 */
export function isBankAccount(account) {
    return account === 'bank_account';
}
/**
 * @param {?} bankAccountData
 * @return {?}
 */
export function isBankAccountData(bankAccountData) {
    return ('country' in bankAccountData &&
        'currency' in bankAccountData &&
        'routing_number' in bankAccountData &&
        'account_number' in bankAccountData &&
        (bankAccountData.account_holder_type === 'individual' ||
            bankAccountData.account_holder_type === 'company' ||
            bankAccountData.account_holder_type === undefined));
}
/**
 * @param {?} pii
 * @return {?}
 */
export function isPii(pii) {
    return pii === 'pii';
}
/**
 * @param {?} piiData
 * @return {?}
 */
export function isPiiData(piiData) {
    return 'personal_id_number' in piiData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc3RyaXBlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvdG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLDJCQWtEQzs7O0lBakRDLG1CQUFXOztJQUNYLHVCQUFnQjs7SUFDaEIsNkJBaUJFOztJQUNGLHFCQXdCRTs7SUFDRiwwQkFBa0I7O0lBQ2xCLHlCQUFrQjs7SUFDbEIscUJBQThCOztJQUM5QixxQkFBYzs7Ozs7QUFLaEIscUNBU0M7OztJQVJDLCtCQUFjOztJQUNkLHdDQUF1Qjs7SUFDdkIsd0NBQXVCOztJQUN2Qix1Q0FBc0I7O0lBQ3RCLHdDQUF1Qjs7SUFDdkIsc0NBQXFCOztJQUNyQiwwQ0FBeUI7O0lBQ3pCLG1DQUFrQjs7Ozs7QUFHcEIsaUNBR0M7OztJQUZDLDRCQUFjOztJQUNkLDRCQUFjOzs7OztBQUtoQiw2QkFNQzs7O0lBTEMsd0JBQWM7O0lBQ2Qsd0JBQWU7O0lBQ2YsdUJBQWE7O0lBQ2Isd0JBQWM7O0lBQ2QsOEJBQW9COzs7OztBQUd0QixpQ0FJQzs7O0lBSEMsMEJBQVk7O0lBQ1osNEJBQWM7O0lBQ2QsMkJBQWE7Ozs7O0FBR2YsaUNBZ0JDOzs7SUFmQyw4QkFBaUI7O0lBQ2pCLG1DQUF1Qjs7SUFDdkIsb0NBQXdCOztJQUN4QiwwQkFBa0I7O0lBQ2xCLGlDQUFtQjs7SUFDbkIsc0NBQXlCOztJQUN6Qix1Q0FBMEI7O0lBQzFCLDZCQUFnQjs7SUFDaEIsZ0NBQWtCOztJQUNsQixxQ0FBd0I7O0lBQ3hCLHNDQUF5Qjs7SUFDekIsa0NBQXFCOztJQUNyQix5Q0FBNEI7O0lBQzVCLG1DQUFzQjs7SUFDdEIsaUNBQW9COzs7OztBQUd0QixzQ0FFQzs7O0lBREMsZ0NBQW1COzs7OztBQUdyQixvQ0FZQzs7O0lBWEMsOEJBQWdCOztJQUNoQiwyQ0FBa0M7O0lBQ2xDLHVDQUFzQjs7SUFDdEIsNENBQTRCOztJQUM1Qiw2Q0FBNkI7O0lBQzdCLHlDQUF5Qjs7SUFDekIseUNBQXlCOztJQUN6QiwwQ0FBMkI7O0lBQzNCLCtDQUFnQzs7SUFDaEMsZ0RBQWlDOztJQUNqQywwQ0FBMEI7Ozs7O0FBRzVCLGlDQUdDOzs7SUFGQyxtQ0FBaUQ7O0lBQ2pELDZDQUFpQzs7Ozs7QUFLbkMscUNBT0M7OztJQU5DLGtDQUFnQjs7SUFDaEIsbUNBQWlCOztJQUNqQix5Q0FBdUI7O0lBQ3ZCLHlDQUF1Qjs7SUFDdkIsOENBQTZCOztJQUM3Qiw4Q0FBK0M7Ozs7O0FBS2pELDZCQUVDOzs7SUFEQyxxQ0FBMkI7Ozs7OztBQUc3QixNQUFNLFVBQVUsU0FBUyxDQUFDLE9BQVk7SUFDcEMsT0FBTyxPQUFPLEtBQUssU0FBUyxDQUFDO0FBQy9CLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxXQUFnQjtJQUM1QyxPQUFPLFdBQVcsQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLHNCQUFzQixDQUFDO0FBQ3hFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUFZO0lBQ3hDLE9BQU8sT0FBTyxLQUFLLGNBQWMsQ0FBQztBQUNwQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsZUFBb0I7SUFFcEIsT0FBTyxDQUNMLFNBQVMsSUFBSSxlQUFlO1FBQzVCLFVBQVUsSUFBSSxlQUFlO1FBQzdCLGdCQUFnQixJQUFJLGVBQWU7UUFDbkMsZ0JBQWdCLElBQUksZUFBZTtRQUNuQyxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsS0FBSyxZQUFZO1lBQ25ELGVBQWUsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTO1lBQ2pELGVBQWUsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLENBQUMsQ0FDckQsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLEtBQUssQ0FBQyxHQUFRO0lBQzVCLE9BQU8sR0FBRyxLQUFLLEtBQUssQ0FBQztBQUN2QixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsT0FBWTtJQUNwQyxPQUFPLG9CQUFvQixJQUFJLE9BQU8sQ0FBQztBQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3IgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbiB7XG4gIGlkOiBzdHJpbmc7XG4gIG9iamVjdDogJ3Rva2VuJztcbiAgYmFua19hY2NvdW50Pzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIGN1cnJlbmN5OiBzdHJpbmc7XG4gICAgZmluZ2VycHJpbnQ6IHN0cmluZztcbiAgICBvYmplY3Q6ICdiYW5rX2FjY291bnQnO1xuICAgIGFjY291bnRfaG9sZGVyX25hbWU6IHN0cmluZztcbiAgICBhY2NvdW50X2hvbGRlcl90eXBlOiAnaW5kaXZpZHVhbCcgfCAnY29tcGFueSc7XG4gICAgYmFua19uYW1lOiBzdHJpbmc7XG4gICAgbGFzdDQ6IHN0cmluZztcbiAgICByb3V0aW5nX251bWJlcjogc3RyaW5nO1xuICAgIHN0YXR1czpcbiAgICAgIHwgJ25ldydcbiAgICAgIHwgJ3ZhbGlkYXRlZCdcbiAgICAgIHwgJ3ZlcmlmaWVkJ1xuICAgICAgfCAndmVyaWZpY2F0aW9uX2ZhaWxkZWQnXG4gICAgICB8ICdlcnJvcmVkJztcbiAgfTtcbiAgY2FyZD86IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvdW50cnk6IHN0cmluZztcbiAgICBjdXJyZW5jeTogc3RyaW5nO1xuICAgIGZpbmdlcnByaW50OiBzdHJpbmc7XG4gICAgb2JqZWN0OiAnY2FyZCc7XG4gICAgYWRkcmVzc19jaXR5OiBzdHJpbmc7XG4gICAgYWRkcmVzc19jb3VudHJ5OiBzdHJpbmc7XG4gICAgYWRkcmVzc19saW5lMTogc3RyaW5nO1xuICAgIGFkZHJlc3NfbGluZTFfY2hlY2s6IEZpZWxkQ2hlY2s7XG4gICAgYWRkcmVzc19saW5lMjogc3RyaW5nO1xuICAgIGFkZHJlc3Nfc3RhdGU6IHN0cmluZztcbiAgICBhZGRyZXNzX3ppcDogc3RyaW5nO1xuICAgIGFkZHJlc3NfemlwX2NoZWNrOiBGaWVsZENoZWNrO1xuICAgIGJyYW5kOiBzdHJpbmc7XG4gICAgY3ZjX2NoZWNrOiBGaWVsZENoZWNrO1xuICAgIGR5bmFtaWNfbGFzdDQ6IHN0cmluZztcbiAgICBleHBfbW9udGg6IG51bWJlcjtcbiAgICBleHBfeWVhcjogbnVtYmVyO1xuICAgIGZ1bmRpbmc6ICdjcmVkaXQnIHwgJ2RlYml0JyB8ICdwcmVwYWlkJyB8ICd1bmtub3duJztcbiAgICBsYXN0NDogc3RyaW5nO1xuICAgIG1ldGFkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0b2tlbml6YXRpb25fbWV0aG9kOiAnYXBwbGVfcGF5JyB8ICdhbmRyb2lkX3BheSc7XG4gIH07XG4gIGNsaWVudF9pcDogc3RyaW5nO1xuICBsaXZlbW9kZTogYm9vbGVhbjtcbiAgdHlwZTogJ2NhcmQnIHwgJ2JhbmtfYWNjb3VudCc7XG4gIHVzZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIEZpZWxkQ2hlY2sgPSAncGFzcycgfCAnZmFpbCcgfCAndW5hdmFpbGFibGUnIHwgJ3VuY2hlY2tlZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZERhdGFPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgYWRkcmVzc19saW5lMT86IHN0cmluZztcbiAgYWRkcmVzc19saW5lMj86IHN0cmluZztcbiAgYWRkcmVzc19jaXR5Pzogc3RyaW5nO1xuICBhZGRyZXNzX3N0YXRlPzogc3RyaW5nO1xuICBhZGRyZXNzX3ppcD86IHN0cmluZztcbiAgYWRkcmVzc19jb3VudHJ5Pzogc3RyaW5nO1xuICBjdXJyZW5jeT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlc3VsdCB7XG4gIHRva2VuPzogVG9rZW47XG4gIGVycm9yPzogRXJyb3I7XG59XG5cbmV4cG9ydCB0eXBlIEFjY291bnQgPSAnYWNjb3VudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzcyB7XG4gIGxpbmUxOiBzdHJpbmc7XG4gIGxpbmUyPzogc3RyaW5nO1xuICBjaXR5OiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHBvc3RhbF9jb2RlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZU9mQmlydGgge1xuICBkYXk6IG51bWJlcjtcbiAgbW9udGg6IG51bWJlcjtcbiAgeWVhcjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExlZ2FsRW50aXR5IHtcbiAgYWRkcmVzczogQWRkcmVzcztcbiAgYWRkcmVzc19rYW5hPzogQWRkcmVzcztcbiAgYWRkcmVzc19rYW5qaT86IEFkZHJlc3M7XG4gIGRvYj86IERhdGVPZkJpcnRoO1xuICBmaXJzdF9uYW1lOiBzdHJpbmc7XG4gIGZpcnN0X25hbWVfa2FuYT86IHN0cmluZztcbiAgZmlyc3RfbmFtZV9rYW5qaT86IHN0cmluZztcbiAgZ2VuZGVyPzogc3RyaW5nO1xuICBsYXN0X25hbWU6IHN0cmluZztcbiAgbGFzdF9uYW1lX2thbmE/OiBzdHJpbmc7XG4gIGxhc3RfbmFtZV9rYW5qaT86IHN0cmluZztcbiAgbWFpZGVuX25hbWU/OiBzdHJpbmc7XG4gIHBlcnNvbmFsX2lkX251bWJlcj86IHN0cmluZztcbiAgcGhvbmVfbnVtYmVyPzogc3RyaW5nO1xuICBzc25fbGFzdF80Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGl2aWR1YWxFbnRpdHkgZXh0ZW5kcyBMZWdhbEVudGl0eSB7XG4gIHR5cGU6ICdpbmRpdmlkdWFsJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdXNpbmVzc0VudGl0eSBleHRlbmRzIExlZ2FsRW50aXR5IHtcbiAgdHlwZTogJ2NvbXBhbnknO1xuICBhZGRpdGlvbmFsX293bmVycz86IExlZ2FsRW50aXR5W107XG4gIGJ1c2luZXNzX25hbWU6IHN0cmluZztcbiAgYnVzaW5lc3NfbmFtZV9rYW5hPzogc3RyaW5nO1xuICBidXNpbmVzc19uYW1lX2thbmppPzogc3RyaW5nO1xuICBidXNpbmVzc190YXhfaWQ/OiBzdHJpbmc7XG4gIGJ1c2luZXNzX3ZhdF9pZD86IHN0cmluZztcbiAgcGVyc29uYWxfYWRkcmVzcz86IEFkZHJlc3M7XG4gIHBlcnNvbmFsX2FkZHJlc3Nfa2FuYT86IEFkZHJlc3M7XG4gIHBlcnNvbmFsX2FkZHJlc3Nfa2Fuamk/OiBBZGRyZXNzO1xuICB0YXhfaWRfcmVnaXN0cmFyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnREYXRhIHtcbiAgbGVnYWxfZW50aXR5PzogSW5kaXZpZHVhbEVudGl0eSB8IEJ1c2luZXNzRW50aXR5O1xuICB0b3Nfc2hvd25fYW5kX2FjY2VwdGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgQmFua0FjY291bnQgPSAnYmFua19hY2NvdW50JztcblxuZXhwb3J0IGludGVyZmFjZSBCYW5rQWNjb3VudERhdGEge1xuICBjb3VudHJ5OiBzdHJpbmc7XG4gIGN1cnJlbmN5OiBzdHJpbmc7XG4gIHJvdXRpbmdfbnVtYmVyOiBzdHJpbmc7XG4gIGFjY291bnRfbnVtYmVyOiBzdHJpbmc7XG4gIGFjY291bnRfaG9sZGVyX25hbWU/OiBzdHJpbmc7XG4gIGFjY291bnRfaG9sZGVyX3R5cGU/OiAnaW5kaXZpZHVhbCcgfCAnY29tcGFueSc7XG59XG5cbmV4cG9ydCB0eXBlIFBpaSA9ICdwaWknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpaURhdGEge1xuICBwZXJzb25hbF9pZF9udW1iZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWNjb3VudChhY2NvdW50OiBhbnkpOiBhY2NvdW50IGlzIEFjY291bnQge1xuICByZXR1cm4gYWNjb3VudCA9PT0gJ2FjY291bnQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBY2NvdW50RGF0YShhY2NvdW50RGF0YTogYW55KTogYWNjb3VudERhdGEgaXMgQWNjb3VudERhdGEge1xuICByZXR1cm4gYWNjb3VudERhdGEubGVnYWxfZW50aXR5IHx8IGFjY291bnREYXRhLnRvc19zaG93bl9hbmRfYWNjZXB0ZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbmtBY2NvdW50KGFjY291bnQ6IGFueSk6IGFjY291bnQgaXMgQmFua0FjY291bnQge1xuICByZXR1cm4gYWNjb3VudCA9PT0gJ2JhbmtfYWNjb3VudCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbmtBY2NvdW50RGF0YShcbiAgYmFua0FjY291bnREYXRhOiBhbnlcbik6IGJhbmtBY2NvdW50RGF0YSBpcyBCYW5rQWNjb3VudERhdGEge1xuICByZXR1cm4gKFxuICAgICdjb3VudHJ5JyBpbiBiYW5rQWNjb3VudERhdGEgJiZcbiAgICAnY3VycmVuY3knIGluIGJhbmtBY2NvdW50RGF0YSAmJlxuICAgICdyb3V0aW5nX251bWJlcicgaW4gYmFua0FjY291bnREYXRhICYmXG4gICAgJ2FjY291bnRfbnVtYmVyJyBpbiBiYW5rQWNjb3VudERhdGEgJiZcbiAgICAoYmFua0FjY291bnREYXRhLmFjY291bnRfaG9sZGVyX3R5cGUgPT09ICdpbmRpdmlkdWFsJyB8fFxuICAgICAgYmFua0FjY291bnREYXRhLmFjY291bnRfaG9sZGVyX3R5cGUgPT09ICdjb21wYW55JyB8fFxuICAgICAgYmFua0FjY291bnREYXRhLmFjY291bnRfaG9sZGVyX3R5cGUgPT09IHVuZGVmaW5lZClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGlpKHBpaTogYW55KTogcGlpIGlzIFBpaSB7XG4gIHJldHVybiBwaWkgPT09ICdwaWknO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQaWlEYXRhKHBpaURhdGE6IGFueSk6IHBpaURhdGEgaXMgUGlpRGF0YSB7XG4gIHJldHVybiAncGVyc29uYWxfaWRfbnVtYmVyJyBpbiBwaWlEYXRhO1xufVxuIl19