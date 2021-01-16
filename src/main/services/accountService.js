import {error} from "./model/error";
import {accessApiGet, accessApiPost} from "./dao/dao";
import {handleGet} from "./serviceHelper";

export async function addNewAccount(state) {
    console.log("Making request to add new Account");
    const body = {
        startDate: state.startDate,
        endDate: state.endDate,
        accountNumber: state.accountNumber,
        accountName: state.accountName,
        description: state.description
    }
    try {
        await accessApiPost('/account', body);
        return true;
    } catch (e) {
        return error;
    }
}

export async function retrieveAccountInfo(accountNumber) {
    return await handleGet(`/account/id/${accountNumber}`)
}

export async function retrieveAllAccounts() {
    try {
        console.log('Making request to Accounts API')
        let res = await accessApiGet(`/accounts`)

        console.log(res);

        if (res.responseBody.accountList === undefined) {
            return {
                roleHistory: []
            }
        }

        return res.responseBody;

    } catch (e) {
        return error;
    }
}