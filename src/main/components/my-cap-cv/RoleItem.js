import React from "react";

import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import StarsIcon from "@material-ui/icons/Stars";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TimelineItem from "@material-ui/lab/TimelineItem";

const ItemPaper = withStyles({
    root: {
        width: '100%',
        textTransform: 'none',
        height: '100px',
        padding: '10px'
    },
    label: {
        textTransform: 'none'
    },
})(Paper)

const StyledButton = withStyles({
    root: {
        width: '100%',
        height: '100px',
        textTransform: 'none'
    },
    label: {
        textTransform: 'none'
    },
})(Button);

const Header = withStyles({
    root: {
        backgroundColor: '#027bb6',
        color: 'white'
    }
})(Typography)

const BodyTyp = withStyles({
    root: {
        marginTop: '10px'
    }
})(Typography)

export default function RoleItem (props) {
    const role = props.role;
    return (
        <TimelineItem key={role.id}>
            <TimelineSeparator>
                <TimelineDot>
                    <StarsIcon/>
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent>
                <Link to={{
                    pathname: `/Account/${role.accountNumber}/Project/${role.projectCode}/ViewRole/${role.id}`,
                    state: {role: role}
                }} style={{ textDecoration: 'none' }}>
                    <StyledButton>
                        <ItemPaper elevation={3}>
                            <Header variant="h6" component="h1">
                                {role.roleName} at {role.projectName}
                            </Header>
                            <BodyTyp variant={"h5"}>
                                {role.startDate}
                            </BodyTyp>
                        </ItemPaper>
                    </StyledButton>
                </Link>
            </TimelineContent>
        </TimelineItem>
    )

}