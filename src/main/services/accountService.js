import {error} from "./model/error";
import {accessApiGet} from "./dao/dao";

export async function retrieveAccountInfo(accountId) {
    try {
        console.log('Making request to Account API')

        let res = await accessApiGet(`/account/id/${accountId}`)
        return res.responseBody;
    } catch (e) {
        return error
    }
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