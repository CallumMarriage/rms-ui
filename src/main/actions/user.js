export const updateUserExists = (userExists) => {
    return {
        type: 'UPDATE_USER_EXISTS',
        userExists: userExists
    };
}

export const updateUserCreds = (user, currentRole,currentProject,
                                currentAccount) => {
    return {
        type: "UPDATE_USER_CREDS",
        user: user,
        currentRole: currentRole,
        currentAccount: currentAccount,
        currentProject: currentProject
    };
};