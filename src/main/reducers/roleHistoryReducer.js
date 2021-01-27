const INITIAL_STATE = {
    roleHistory: [],
};

export default function roleHistoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_ROLE_HISTORY':
            return {...state, roleHistory: action.roleHistory}
        default:
            return state;
    }
};