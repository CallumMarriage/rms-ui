import React from "react";

import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function Application(props) {
    return (
        <Paper>
            <Typography variant={"body2"}>
                Project ID: {props.projectId}
            </Typography>
            <Typography variant={"body2"}>
                Application Date: {props.applicationDate}
            </Typography>
            <Typography variant={"body2"}>
                Application Status: {props.applicationStatus}
            </Typography>
        </Paper>
    )
}