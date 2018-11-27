function singleReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_ISSUE':
            return Object.assign({}, state, action.data);
        case 'ADD_COMMENT':
            state.comments.unshift(action.data);
            let comments = state.comments;
            return Object.assign({}, state, {
                comments: comments
            });
        case 'RESOLVE':
            return {...state, status : 'Resolved'};
        default:
            return state;
    }
}

export default singleReducer;