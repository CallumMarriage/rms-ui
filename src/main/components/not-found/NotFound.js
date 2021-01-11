import React from "react";
import {Typography} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
function NotFound(props) {
    return (
        <div>
            <Typography variant={'body1'}>
                The Page that you searched for cannot be found.
            </Typography>
            <ErrorIcon/>
        </div>
    );
}

export default NotFound;