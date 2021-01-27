import React from "react";
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";

import RolesContainer from "./RolesContainer";
import TitleContainer from "../shared/TitleContainer";
import {findRolesWithFilters, retrievePotentialRoles, retrieveRolesByAccountName} from "../../services/roleService";
import {getRoleTypes} from "../shared/RoleTypes";
import Error from "../shared/Error";

const StyledPaper = withStyles({
    root: {
        marginBottom: '20px'
    }
})(Paper);

class FindRoles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potentialRoles: [],
            roleType: getRoleTypes()[getRoleTypes().length -1].value,
            accountName: '',
            projectName: '',
            filterActive: false,
            filteredPotentialRoles: [],
            loading: true,
            amount: 10,
            searchItem: '',
            searching: true,
            hasError: false,
            error: null,
            currentPage: 0,
            currentPageItems: []
        };
    }

    async filter() {
        let filters = []

        this.setState({filterActive: true})

        if (this.state.roleType !== '') {
            filters.push(`roleType=${this.state.roleType}`)
        }

        if (this.state.accountName !== '') {
            filters.push(`accountName=${this.state.accountName}`)
        }

        if (this.state.projectName !== '') {
            filters.push(`projectName=${this.state.projectName}`)
        }

        const response = await findRolesWithFilters(filters);

        if(response.hasError){
            alert('error running filter')
        } else {
            this.setState({
                filteredPotentialRoles: response.potentialRoles
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeByRoleType(e) {

        this.setState({
            roleType: e.target.value,
        })
    }

    async handleSearchByAccount(e) {
        await this.searchByAccount(e.target.value)
    }

    async searchByAccount(accountName) {
        const res = await retrieveRolesByAccountName(accountName);

        this.saveResponse(res);
    }


    setAsFiltering() {
        this.setState({
            searching: true,
            filterActive: true,
            filteredPotentialRoles: []
        })
    }

    searchByRoleType(roleType) {

        return this.state.potentialRoles.filter(
            role => role.roleType === roleType)
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
        this.saveResponse(res);
    }

    saveResponse(res) {
        if (res == null) {
            this.setState({
                loading: false,
                hasError: false
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
                hasError: false,
                searching: false
            })
        }
    }

    render() {

        let potentialRoles = this.state.potentialRoles;

        if (this.state.filterActive) {
            potentialRoles = this.state.filteredPotentialRoles;
        }

        const userId = this.props.userId;
        return (
            <Grid container>
                <TitleContainer title={'Find new roles'}/>

                <Grid item xs={4}>
                    <StyledPaper style={{width: '90%'}}>
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
                                       name={"projectName"}
                                       value={this.state.projectName}
                                       type="search"
                                       variant="outlined"
                                       onChange={this.handleChange.bind(this)}
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
                                       name={"accountName"}
                                       value={this.state.accountName}
                                       type="search"
                                       variant="outlined"
                                       onChange={this.handleChange.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField style={{
                                width: '90%',
                                marginTop: '20px',
                                height: '20%'
                            }}
                                       id="outlined-select-roleType"
                                       select
                                       label="Search By Role Type"
                                       value={this.state.roleType}
                                       onChange={this.handleChangeByRoleType.bind(this)}
                                       helperText="Please select from the list what closest matches your role"
                                       variant="outlined">
                                {getRoleTypes().map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Button onClick={this.filter.bind(this)}>
                            Search
                        </Button>
                        <Button onClick={this.resetFilter.bind(this)}>
                            Reset Filters
                        </Button>
                    </StyledPaper>
                </Grid>
                <Grid item xs={8}>
                    {loadPotentialRolesBox(this.state.loading, this.state.hasError, potentialRoles, this.state.searching, userId)}
                </Grid>
                <Grid item xs={12}>
                    <div style={{marginBottom: '50px'}}>

                    </div>
                </Grid>
            </Grid>
        );
    }
}


function loadPotentialRolesBox(loading, hasError, potentialRoles, isSearching) {

    if (loading) {
        return (<CircularProgress/>
        )
    }

    if (hasError) {
        return (
            <Error/>
        )
    }

    if (isSearching) {
        return (
            <Paper style={
                {
                    width: '100%',
                    minHeight: '350px',
                    maxHeight: '400px',
                    overflow: 'auto'
                }
            }>
                <CircularProgress style={{marginTop: '20px'}}/>
            </Paper>
        );
    } else if (potentialRoles.length === 0) {
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

const mapStateToProps = (state) => {
    return {
        userId: state.user.user.userId,
    };
}

export default connect(mapStateToProps)(FindRoles);