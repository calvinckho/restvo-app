export interface CommunitiesBoards {
    _id: string,
    name: string,
    modal_display: boolean,
    boards: [{
        _id: string,
        name: string,
        background: [string],
        group: {
            _id: string,
            leaders: [{
                _id: string,
                name: string
            }]
        };
        posts: any
    }];
}

export interface Boards {
    _id: string,
    name: string,
    background: [string],
    group: {
        _id: string,
        leaders: [{
            _id: string,
            name: string
        }]
    };
}