export interface Conversation {
    conversation: [{
            sequence: number,
            body: string,
            attachments: [string],
            moment: any,
            quote: {
                body: string,
                attachments: [string],
                author: string
            },
            author: { // Restvo app user
                first_name: string,
                last_name: string,
                avatar: string
            },
            author_pending_member: { // non Restvo app user
                name: string,
            },
            createdAt: string,
            updatedAt: string,
    }];
}

export interface Messages {
    timestamp: string,
    createdAt: string,
}
