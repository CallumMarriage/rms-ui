const INITIAL_STATE = {
    isSignedIn: null,
    loading: true,
    user: null,
    currentRole: null,
    currentAccount: null,
    currentProject: null
};

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state, isSignedIn: true, user: action.user, loading: false,
                currentProject: action.currentProject, currentRole: action.currentRole,
                currentAccount: action.currentAccount
            };
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, loading: false};
        default:
            return state;
    }
};