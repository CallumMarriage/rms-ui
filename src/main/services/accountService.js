import {error} from "./model/error";
import {accessApiGet} from "./dao/dao";

export async function retrieveAccountInfo(accountId) {
    try {
        console.log('Making request to Account API')

        let res = await accessApiGet(`/account/id/${accountId}`)
        return res.responseBody;
    } catch (e) {
        return error
    }
}

