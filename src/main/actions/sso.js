export const signIn = (ssoId) => {
    return {
        type: "SIGN_IN",
        ssoId: ssoId
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    };
};