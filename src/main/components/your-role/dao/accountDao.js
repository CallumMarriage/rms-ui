import {accessGet} from "./dao";

export async function retrieveAccountInfo(accountId) {
    try {
        console.log('Making request to Account API')

        return await accessGet(`/account/id/${accountId}`)

    } catch (e) {
        console.log(e);
    }
}