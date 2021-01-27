const INITIAL_STATE = {
    isSignedIn: null,
    ssoId: null,
    loading: true,
};

export default function ssoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state, isSignedIn: true, ssoId: action.ssoId, loading: false
            };
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, loading: false};
        default:
            return state;
    }
};