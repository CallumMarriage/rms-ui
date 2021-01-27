import {accessApiGet} from "./dao/dao";
import {error} from "./model/error";

export async function handleGet(endpoint) {
    try {
        let res = await accessApiGet(endpoint)
        return res;
    } catch (e) {
        console.log(e);
        return error
    }
}
