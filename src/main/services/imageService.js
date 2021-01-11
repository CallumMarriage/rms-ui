import { accessImageGet, accessImagePost } from "./dao/dao";
import {error} from "./model/error";

export async function uploadImageFile(accountId, file) {
    try {
        console.log('Making upload image request to Account API')

        const body = {
            accountId: accountId,
            base64EncodedImage: file
        }

        return await accessImagePost(`/image`, body)
    } catch (e) {
        return error
    }
}

export async function retrieveImageFile(accountId) {
    try {
        console.log('Making GET image request to Account API')

        let image = await accessImageGet(`/image?accountId=${accountId}`)
        return image.responseBody;
    } catch (e) {
        return error
    }
}
