export interface User {
    mobile: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    biography: string,
    churches: [{
        _id: string, //list of joined communities
        name: string,
        boards: [string],
        modal_display: boolean,//modal_display is also dated and obsolete
    }],
    groups: [{
        _id: string, //list of joined groups
        name: string,
        churchId: string,
        modal_display: boolean, //modal_display is also dated and obsolete
        role: string
    }],
    primary_email: string,
    mobile_phone: string, //this is the mobile number that is stored but has not been verified
    home_phone: string, //additional contact info
    street: string,
    city: string,
    state: string,
    zip: string,
    avatar: string,
    country: string,
    deviceTokens: [(string|{})], //device tokens are device-specific APN or FCM assigned registration IDs, or Web Push subscription object
    unreadBadgeCount: number,
    role: string,
    language: string,
    shareContactInfo: boolean,
    importContactList: boolean,
    enablePushNotification: boolean,
    pushNotifyUnreadChatMessages: boolean,
    pushNotifySystemMessages: boolean,
    emailNotifyUnreadChatMessages: boolean,
    emailNotifySystemMessages: boolean,
    hideInDirectory: boolean,
    lastLoginAt: string,
    recoveryURL: string,
    recoveryCode: number,
    snoozed: {
        state: string,
        expiredAt: string,
    },
    restSchedule: {
        breakExpiredAt: string,
        vacationExpiredAt: string,
        //timezone: {dstOffset: Number, rawOffset: Number, status: String, timeZoneId: String, timeZoneName: String},
    },
    appName: string,
    lockedAt: string;
}

