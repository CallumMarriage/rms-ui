const INITIAL_STATE = {
    userHasCreds: false,
    userExists: null,
    loading: true,
    user: null,
    currentRole: null,
    currentAccount: null,
    currentProject: null
};

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_USER_EXISTS':
            return {...state, userExists: action.userExists}
        case 'UPDATE_USER_CREDS':
            return {...state, user: action.user, loading: false,
                currentProject: action.currentProject, currentRole: action.currentRole,
                currentAccount: action.currentAccount }
        default:
            return state;
    }
};