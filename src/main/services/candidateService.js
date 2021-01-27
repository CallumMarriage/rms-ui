import {accessApiGet} from "./dao/dao";
import {error} from "./model/error";

export async function retrieveCandidatesForResourceManager(resourceManagerId) {
    try {
        console.log('Making request to Role API')
        let res = await accessApiGet(`/candidates?rmId=${resourceManagerId}`);

        if (res.candidates === undefined) {
            return {
                candidates: []
            }
        }

        return res;

    } catch (e) {
        return error;
    }
}