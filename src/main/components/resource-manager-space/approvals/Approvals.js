import React from "react";

import Grid from "@material-ui/core/Grid";
import TitleContainer from "../../shared/TitleContainer";
import NewRoleRequests from "./NewRoleRequests";
import CandidateApplications from "./CandidateApplications";

class Approvals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Grid container>
                <TitleContainer title={"Your waiting approvals"}/>
                <Grid item xs={12}>
                    <CandidateApplications/>
                </Grid>
                {/*<Grid item xs={6}>*/}
                {/*    <NewRoleRequests/>*/}
                {/*</Grid>*/}
            </Grid>
        )
    }
}

export default Approvals;