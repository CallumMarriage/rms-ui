import {Button, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export const StyledPaper = withStyles({
    root: {
        marginBottom: '50px',
        width: '90%',
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingBottom: '20px',
        paddingTop: '20px'

    }
})(Paper);

export const StyledButton = withStyles({
    root: {
        width: '100%',
        marginTop: '10px'
    }
})(Button)