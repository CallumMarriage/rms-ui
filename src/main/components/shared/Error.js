import {Typography} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";

export default function Error(props){
    return (
        <div>
            <Typography variant={"h6"}>
                Oops... looks like there has been an error
            </Typography>
            <ErrorIcon/>
        </div>
    )
}