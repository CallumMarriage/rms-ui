import {error} from "./model/error";
import {accessApiGet, accessApiPost} from "./dao/dao";

export async function retrieveUserInfo(ssoId) {
    try {
        console.log('Making request to user API')

        const res = await accessApiGet(`/user/info?ssoId=${ssoId}`);

        return res;
    } catch (e) {
        return error;
    }
}

export async function userExists(ssoId) {
    try {
        console.log('Making request to USER API')

        const res = await accessApiGet(`/user/exists?ssoId=${ssoId}`);

        return res;
    } catch (e) {
        return error;
    }
}

export async function handleAddNewUser(ssoId, name, currentRoleId, userType, userSpecialism) {

    try {
        const data = {
            ssoId: ssoId,
            currentRoleId: currentRoleId,
            name: name,
            userType: userType,
            userSpecialism: userSpecialism
        }

        const res = await accessApiPost(`/user/`, data);
        return res;
    } catch (e) {
        return error;
    }
}

export async function retrieveResourceManagerName(rmId) {
    try {
        console.log('Making request to User API')

        const res = await accessApiGet(`/user/resourceManager/${rmId}`);

        return res;
    } catch (e) {
        return error;
    }
}