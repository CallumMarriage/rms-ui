import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import RoleItem from "./RoleItem";

const StartPaper = withStyles({
    root: {
        width: '80%',
        textTransform: 'none',
        backgroundColor: '#2E8B57',
        marginBottom: '20px',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
    },
    label: {
        textTransform: 'none'
    },
})(Paper);


const EndPaper = withStyles({
    root: {
        backgroundColor: '#027bb6',
    }
})(StartPaper);

const BottomTimelineSeparator = withStyles({
    root: {
        marginTop: '20px',
        minWidth: '50%'
    }
})(TimelineSeparator)

const TopTimelineSeparator = withStyles({
    root: {
        minWidth: '50%'
    }
})(TimelineSeparator)

const StyledTimeline = withStyles({
    root: {
        backgroundColor: '#DCDCDC'
    }
})(Timeline)



export default function CustomizedTimeline(props) {
    return (
        <StyledTimeline align="alternate">
            <TimelineItem>
                <TopTimelineSeparator>
                    <StartPaper elevation={3}>
                        <Typography variant="h6" component="h1">
                            {'The start of your Capgemini Journey'}
                        </Typography>
                    </StartPaper>
                    <TimelineConnector/>
                </TopTimelineSeparator>
                <TimelineContent>
                </TimelineContent>
            </TimelineItem>
            {
                props.roleHistory.map(role => {
                        return (
                            <RoleItem role={role} key={role.id}/>
                        )
                    }
                )
            }
            <TimelineItem>
                <BottomTimelineSeparator>
                    <EndPaper elevation={3}>
                        <Typography variant="h6" component="h1">
                            {'You are up to date'}
                        </Typography>
                    </EndPaper>
                </BottomTimelineSeparator>
                <TimelineContent>
                </TimelineContent>
            </TimelineItem>
        </StyledTimeline>
    );
}