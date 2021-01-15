import {error} from "./model/error";
import {accessApiGet} from "./dao/dao";
import {handleGet} from "./serviceHelper";

export async function retrieveAccountInfo(accountId) {
    return await handleGet(`/account/id/${accountId}`)
}

export async function retrieveAllAccounts(){
    try{
        console.log('Making request to Accounts API')
        let res = await accessApiGet(`/accounts`)

        console.log(res);

        if (res.responseBody.accountList === undefined) {
            return {
                roleHistory: []
            }
        }

        return res.responseBody;

    } catch (e){
        return error;
    }
}