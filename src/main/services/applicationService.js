import {accessApiGet, accessApiPost} from "./dao/dao";
import {error} from "./model/error";

export async function retrieveApplicationsForRm(rmId) {
    try {
        console.log('Making request to Applications api')

        const res = await accessApiGet(`/applications?rmId=${rmId}`);

        if (res.applicationInfoList === undefined) {
            return {
                applicationInfoList: []
            }
        }

        return res;
    } catch (e) {
        return error
    }
}

export async function hasUserAlreadyApplied(userId, roleId) {
    try {
        console.log('Making request to Applications api')

        const res = await accessApiGet(`/userAlreadyApplied?userId=${userId}&&roleId=${roleId}`);
        return res
    } catch (e) {
        console.log(e);
        return {
            hasError: true
        }
    }
}

export async function approveCandidateApplication(applicationId, authorizerId) {
    try {
        console.log('Making request to approve application for role')
        console.log(authorizerId)
        const body = {
            applicationId: applicationId,
            authorizerId: authorizerId
        }

        return await accessApiPost('/application/confirm', body);
    } catch (e) {
        return {
            hasError: true
        }
    }
}

export async function rejectCandidateApplication(applicationId, authorizerId) {
    try {
        console.log('Making request to reject application for role')
        const body = {
            applicationId: applicationId,
            authorizerId: authorizerId
        }

        return await accessApiPost('/application/reject', body);
    } catch (e) {
        return {
            hasError: true
        }
    }
}

export async function markAsInReviewCandidateApplication(applicationId, authorizerId) {
    try {
        console.log('Making request to reject application for role')
        const body = {
            applicationId: applicationId,
            authorizerId: authorizerId
        }

        return await accessApiPost('/application/inReview', body);
    } catch (e) {
        console.log(e);
        return {
            hasError: true
        }
    }
}

export async function retrieveApplications(userId) {
    try {
        console.log('Making request to Applications api')

        const res = await accessApiGet(`/applications?userId=${userId}`);

        if (res.applicationInfoList === undefined) {
            return {
                applicationInfoList: []
            }
        }

        return res;
    } catch (e) {
        return error
    }
}

export async function retrieveNumOfApplications(userId) {
    try {
        console.log('Making request to Applications api')

        const res = await accessApiGet(`/applications/amount?userId=${userId}`);
        return res
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

        return await accessApiPost('/application/submit', body);
    } catch (e) {
        console.log(e);
        return {
            hasError: true
        }
    }
}