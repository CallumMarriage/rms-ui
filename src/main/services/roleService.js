import { error } from "./model/error";
import {accessApiGet, accessApiPost} from "./dao/dao";

export async function addNewRole(userId, role){
    console.log("Making request to add new Role");

    const body = {
        userId,
        role
    }
    try {
        await accessApiPost('/roleForUser', body);
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