
import {error} from "./model/error";
import {accessApiGet, accessApiPost} from "./dao/dao";

export async function handleInternalLogin(googleId) {

    const data = {
        googleId: googleId
    }

    return await addNewUser(data);
}

export async function retrieveResourceManagerName(rmId){
    try {
        console.log('Making request to Role API')

        const res = await accessApiGet(`/user/resourceManager/${rmId}`);

        return res.responseBody;
    } catch (e) {
        return error;
    }
}

async function addNewUser(data) {
    try {
        await accessApiPost('/user', data);
    } catch (e) {
        return error;
    }
}