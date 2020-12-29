import {accessGet} from "./dao";

export async function retrieveRoleInfo() {
    try {
        console.log('Making request to Role API')

        return await accessGet(`/role/id/9999999999/`);

    } catch (e) {
        console.log(e);
    }
}