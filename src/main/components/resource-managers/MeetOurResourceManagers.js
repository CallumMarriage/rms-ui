import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import Error from "../shared/Error";


class MeetOurResourceManagers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceManagers: []
        };
    }

    async componentDidMount() {

        const res = await retrieveResourceManagers();
        this.setState({resourceManagers: []})

        if (res == null) {
            this.setState({
                loading: false
            })
        } else if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false,
                error: res.error
            })
        } else {
            this.setState({
                resourceManagers: res.resourceManagers,
                loading: false,
                searching: false
            })
        }
    }

    render() {
        if (this.state.loading) {
            return (<CircularProgress/>
            )
        }

        if (this.state.hasError) {
            return (
                <Error/>
            )
        }

        let resourceManagers = this.state.resourceManagers;

        return (
            <Grid container>

            </Grid>
        );
    }
}

export default MeetOurResourceManagers;