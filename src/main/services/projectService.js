
import {handleGet} from "./serviceHelper";

export async function retrieveProjectInfo(projectCode) {

    console.log('Making request to Project API')

    return await handleGet(`/projects/id/${projectCode}`)
}
