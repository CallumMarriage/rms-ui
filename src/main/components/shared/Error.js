import {Typography, withStyles} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import Paper from "@material-ui/core/Paper";

const StyledPaper = withStyles({
    root: {
        width: '500px',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
        border: '3px solid red',
        color: 'black',
        padding: '50px'
    }
})(Paper)

const SErrorIcon = withStyles({
    root: {
        fontSize: '10em',
        color: 'red'
    }
})(ErrorIcon)

export default function Error(props){
    return (
        <StyledPaper variant={"outlined"} elevation={8} square>
            <Typography variant={"h6"}>
                Oops... looks like there has been an error
            </Typography>
            <SErrorIcon/>
        </StyledPaper>
    )
}