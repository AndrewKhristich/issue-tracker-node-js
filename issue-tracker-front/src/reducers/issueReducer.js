function issueReducer(state = [], action) {
    switch (action.type) {
        case 'SET_ISSUES':
            return Object.assign([], state, action.data);
        case 'ADD_ISSUE':
            let index = state.findIndex(value => value.id == action.data.id);
            if (index == -1) {
                return [...state, action.data];
            }
            return state;
        default:
            return state;
    }
}

export default issueReducer;