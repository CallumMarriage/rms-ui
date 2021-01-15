import {accessApiGet} from "./dao/dao";
import {error} from "./model/error";

export async function handleGet(endpoint) {
    try {
        let res = await accessApiGet(endpoint)
        return res.responseBody;
    } catch (e) {
        return error
    }
}
