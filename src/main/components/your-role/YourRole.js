import React from 'react';

import './YourRole.css';

import Paper from "@material-ui/core/Paper";
import {Typography} from '@material-ui/core';

import {retrieveRoleInfo} from './dao/roleDao';
import {retrieveAccountInfo} from './dao/accountDao'
import Navbar from "../shared/nav-bar/Navbar";

class YourRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleName: null,
            accountNumber: null,
            projectCode: null,
            startDate: null,
            endDate: null,
            description: null,
            accountName: null
        };
    }

    async componentDidMount() {
        let roleInfo = await retrieveRoleInfo();
        if (roleInfo === undefined || roleInfo === null){
            return;
        }
        if (roleInfo.accountNumber !== null) {
            let accountInfo = await retrieveAccountInfo(roleInfo.accountNumber);
            if(accountInfo === undefined || accountInfo.accountCode === undefined){
                return;
            }
            this.setState({
                roleName: roleInfo.roleName,
                accountNumber: roleInfo.accountNumber,
                projectCode: roleInfo.projectCode,
                startDate: roleInfo.startDate,
                endDate: roleInfo.endDate,
                description: roleInfo.description,
                accountName: accountInfo.accountName
            })
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Paper className="ContentBox" color="text.primary" elevation={3}>
                    <Typography variant="h3" id="roleName"> {this.state.roleName} </Typography>
                    <Typography variant="subtitle1" id="desc"> {this.state.description} </Typography>
                    <p> Start Date: {this.state.startDate} </p>
                    <p> Expected End Date: {this.state.endDate} </p>
                    <p> {this.state.accountNumber} </p>
                    <p> {this.state.projectCode} </p>
                </Paper>
            </div>
        );
    }
}

export default YourRole;
