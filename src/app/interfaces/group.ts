export interface Group {
    name: string,
    conversation: string,
    board: string,
    churchId: string,
    keywords: string,
    image_url: string, //used in wee.church webapp
    background: string, //used in Restvo app
    meeting_day: string,
    meeting_frequency: string,
    meeting_location: {location: string, street: string, city: string, state: string, postal: number, country: string},
    beginAt: string,
    endAt: string,
    details: string,
    leaders: [{
        _id: string,
        first_name: string,
        last_name: string,
        avatar: string,
        name: string
    }],
    members: [{
        _id: string,
        name: string
    }],
    pending_leaders: [{
        _id: string,
        name: string
    }],
    pending_members: [{
        _id: string,
        name: string
    }],
    pending_email_leaders: [{
        email: string,
        name: string
    }],
    pending_email_members: [{
        email: string,
        name: string,
        mobile_phone: string,
        mobile_carrier: string,
        home_phone: string,
        work_phone: string,
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        email_opt_out: boolean,
        sms_opt_in: boolean,
        short_note: string,
        string_joined: string
    }],
    sms_members: [{
        name: string,
        mobile_phone: string,
        home_phone: string,
        work_phone: string,
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        short_note: string,
        opt_in: boolean,
        string_joined: string
    }],
    emailDisabled: boolean,
    smsDisabled: boolean,
    smsKeyword: string,
    timezone: {dstOffset: number, rawOffset: number, status: string, timeZoneId: string, timeZoneName: string},
    public_group: boolean,
    flagged: boolean,
    published: boolean,
    publishedAt: string,
    expireAt: string;
}
