import {accessApiGet, accessApiPost} from "./dao/dao";
import {error} from "./model/error";

export async function retrieveApplications(userId) {
    try {
        console.log('Making request to Applications api')

        const res = await accessApiGet(`/applications?userId=${userId}`);

        if (res.responseBody.applicationInfoList === undefined) {
            return {
                applicationInfoList: []
            }
        }

        return res.responseBody;
    } catch (e) {
        return error
    }
}

export async function retrieveNumOfApplications(userId) {
    try {
        console.log('Making request to Applications api')

        const res = await accessApiGet(`/applications/amount?userId=${userId}`);
        return res.responseBody
    } catch (e) {
        console.log(e);
        return {
            hasError: true
        }
    }
}

export async function applyForRole(userId, role) {
    try {
        console.log('Making request to add application for role')
        const body = {
            applicantId: userId,
            roleId: role.id,
            projectCode: role.projectCode,
            accountNumber: role.accountNumber
        }

        return await accessApiPost('/application', body);
    } catch (e) {
        return {
            hasError: true
        }
    }
}