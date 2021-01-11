export const signIn = (user, currentRole,
                       currentAccount, currentProject) => {
    return {
        type: "SIGN_IN",
        user: user,
        currentRole: currentRole,
        currentAccount: currentAccount,
        currentProject: currentProject
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    };
};