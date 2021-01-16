import { error } from "./model/error";
import {accessApiGet, accessApiPost} from "./dao/dao";

export async function addNewRole(userId, state){
    console.log("Making request to add new Role");
    const body = {
        userId,
        role : {
            startDate: state.startDate,
            endDate: state.endDate,
            accountNumber: state.accountNumber,
            accountName: state.accountName,
            projectCode: state.project.projectCode,
            projectName: state.project.projectName,
            description: state.description,
            roleName: state.roleName,
            roleType: state.roleType
        }
    }
    try {
        await accessApiPost('/role', body);
        return true;
    } catch (e) {
        return error;
    }
}

export async function retrieveRoleInfo(id) {
    try {
        console.log('Making request to Role API')

        const res = await accessApiGet(`/user/info?googleId=${id}`);

        return res.responseBody;
    } catch (e) {
        return error;
    }
}

export async function retrieveRole(roleId) {
    try {
        console.log('Making request to Role API')

        const res = await accessApiGet(`/role/id/${roleId}`);

        return res.responseBody;
    } catch (e) {
        return error;
    }
}

export async function retrieveRolesByAccountName(accountName) {
    try {
        console.log('Making request to Role API')

        const res = await accessApiGet(`roles?roleType=${accountName}`)

        if (res.responseBody.potentialRoles === undefined) {
            return {
                potentialRoles: []
            }
        }

        return res.responseBody;
    } catch (e) {
        return error;
    }
}

export async function retrieveRolesByRoleType(roleType) {
    try {
        console.log('Making request to Role API')

        const res = await accessApiGet(`/roles?roleType=${roleType}`);

        if (res.responseBody.potentialRoles === undefined) {
            return {
                potentialRoles: []
            }
        }

        return res.responseBody;

    } catch (e) {
        return error;
    }
}

export async function retrievePotentialRoles() {
    try {
        console.log('Making request to Role API for potential roles')

        const res = await accessApiGet(`/roles`);

        if (res.responseBody.potentialRoles === undefined) {
            return {
                potentialRoles: []
            }
        }

        return res.responseBody;
    } catch (e) {
        return error;
    }
}