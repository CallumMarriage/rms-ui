
import {handleGet} from "./serviceHelper";
import {accessApiPost} from "./dao/dao";
import {error} from "./model/error";

export async function retrieveProjectInfo(projectCode) {

    console.log('Making request to Project API')

    return await handleGet(`/projects/id/${projectCode}`)
}

export async function addNewProject(state){
    console.log("Making request to add new Project");

    const body = {
        startDate: state.startDate,
        endDate: state.endDate,
        accountNumber: state.accountNumber,
        projectCode: state.projectCode,
        projectName: state.projectName,
        description: state.description
    }

    try {
        await accessApiPost('/project', body);
        return true;
    } catch (e) {
        return error;
    }
}
