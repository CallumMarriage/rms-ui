const INITIAL_STATE = {
    userId: null
};

export default function updateIdReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_ID':
            return {...state, userId: action.id};
        default:
            return state;
    }
};