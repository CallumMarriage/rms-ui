import { accessApiGet } from "./dao/dao";
import { error } from "./model/error";

export async function retrieveRoleHistory(id) {
    try {
        console.log('Making request to Role API')
        let res = await accessApiGet(`/roles?userId=${id}`);
        if (res.responseBody.potentialRoles === undefined) {
            return {
                roleHistory: []
            }
        }

        return res.responseBody;

    } catch (e) {
        return error;
    }
}