import React from "react";
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import RolesContainer from "./RolesContainer";
import TitleContainer from "../shared/TitleContainer";
import { retrievePotentialRoles } from "../../services/roleService";

import Error from "../shared/Error";
import {applyForRole} from "../../services/applicationService";


class FindRoles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potentialRoles: [],
            filterActive: false,
            filteredPotentialRoles: [],
            loading: true,
            amount: 10,
            searchItem: '',
            searching: true,
            hasError: false,
            error: null
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            filterActive: true
        });
        this.submitSearch(e.target.value);
    };

    submitSearch(searchItem) {
        this.setState(
            {searching: true}
        )

    }

    resetFilter() {
        this.setState({
            filterActive: false
        })
    }

    async componentDidMount() {
        const userId = this.props.userId;

        const res = await retrievePotentialRoles(userId, 10);
        this.setState({potentialRoles: []})

        if (res == null) {
            this.setState({
                loading: false
            })
        } else if (res.hasError) {
            this.setState({
                hasError: true,
                error: res.error
            })
        } else {
            this.setState({
                potentialRoles: res.potentialRoles,
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

        let potentialRoles = this.state.potentialRoles;

        if (this.state.filterActive) {
            potentialRoles = this.state.filteredPotentialRoles;
        }

        const userId = this.props.userId;
        return (
            <Grid container>
                <TitleContainer title={'Find new roles'}/>

                <Grid item xs={4}>
                    <Paper style={{width: '90%'}}>
                        <Typography variant={"h6"}>
                            Use these filters to refine your search
                        </Typography>
                        <Grid item xs={12}>
                            <TextField style={{
                                width: '90%',
                                marginTop: '20px',
                                height: '5%'
                            }}
                                       id="outlined-search"
                                       label={"Search By Project"}
                                       name={"searchItem"}
                                       value={this.state.searchItem}
                                       type="search"
                                       variant="outlined"
                                       onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField style={{
                                width: '90%',
                                marginTop: '20px',
                                height: '20%'
                            }}
                                       id="outlined-search"
                                       label="Search By Account"
                                       name={"searchItem"}
                                       value={this.state.searchItem}
                                       type="search"
                                       variant="outlined"
                                       onChange={this.handleChange}
                            />
                        </Grid>

                        <Button onClick={this.resetFilter}>
                            Reset Filters
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    {loadPotentialRolesBox(potentialRoles, this.state.searching, userId)}
                </Grid>
            </Grid>
        );
    }
}


function loadPotentialRolesBox(potentialRoles, isSearching) {
    if (isSearching) {
        return (
            <Paper style={{width: '100%', minHeight: '350px', maxHeight: '400px', overflow: 'auto'}}>
                <CircularProgress style={{marginTop: '20px'}}/>
            </Paper>
        );
    } else if(potentialRoles.length === 0) {
        return (
            <Paper>
                No roles matching your search.
            </Paper>
        )
    } else {
        return (
            <RolesContainer potentialRoles={potentialRoles}/>
        )
    }
}

async function apply(role, userId) {
    await applyForRole(userId, role);
    // window.location.reload(false);
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    };
}

export default connect(mapStateToProps)(FindRoles);