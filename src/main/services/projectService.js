
import {handleGet} from "./serviceHelper";
import {accessApiPost} from "./dao/dao";
import {error} from "./model/error";

export async function retrieveProjectInfo(projectCode) {

    try{
        return await handleGet(`/projects/id/${projectCode}`)
    } catch (e){
        return error;
    }
}

export async function retrieveAccountsAndProjectsForPm(projectManagerId) {

    try{
        const res = await handleGet(`/accounts/projects?projectManagerId=${projectManagerId}`)
        if (res.accountAndProjectsList === undefined) {
            return {
                accountAndProjectsList: []
            }
        }

        return res;

    } catch (e){
        return error;
    }
}


export async function retrieveProjectsForProjectManager(projectManagerId){
    try{
        return await handleGet(`/projects?projectManagerId=${projectManagerId}`)
    } catch (e){
        return error;
    }
}

export async function addNewProject(state){
    const body = {
        startDate: state.startDate,
        endDate: state.endDate,
        accountNumber: state.accountNumber,
        projectCode: state.projectCode,
        projectName: state.projectName,
        description: state.description,
        projectManagerId: state.userId
    }

    try {
        await accessApiPost('/project', body);
        return true;
    } catch (e) {
        return error;
    }
}
