import Grid from "@material-ui/core/Grid";
import TitleContainer from "../shared/TitleContainer";
import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Approvals from "./approvals/Approvals";

export default function ResourceManagement(props){
    return (
        <Grid container>
            <TitleContainer title={"Resource Management"}/>
            <Grid item xs={6}>
                <Approvals/>
            </Grid>
            <Grid item xs={6}>
                <Link to={"/ResourceManagement/ViewCandidates"}>
                    <Button>
                        Your candidates
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}