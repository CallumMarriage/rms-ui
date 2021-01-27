import Chart from "react-google-charts";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

class RolesChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roleList: null
        }
    }


    async componentDidMount() {
        const project = this.props.targetProject

        if (project === undefined) {
            return;
        }

        let roles = [
            [
                {type: 'string', label: 'Task ID'},
                {type: 'string', label: 'Task Name'},
                {type: 'string', label: 'Resource'},
                {type: 'date', label: 'Start Date'},
                {type: 'date', label: 'End Date'},
                {type: 'number', label: 'Duration'},
                {type: 'number', label: 'Percent Complete'},
                {type: 'string', label: 'Dependencies'},
            ],
            [
                project.projectCode,
                project.projectName,
                project.accountNumber,
                new Date(project.startDate),
                new Date(project.endDate),
                0,
                0,
                null,
            ]
        ]
        this.props.roleList.forEach((role) => {
            roles.push(generateGanttChartRole(role, project.endDate));
        })

        this.setState({
            roleList: roles
        })
    }

    render() {
        if (this.state.roleList == null) {
            return (
                <CircularProgress style={{marginTop: '20px'}}/>
            )
        }
        return (
            <Paper>

                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}>
                            Past and active roles on this project.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Chart
                            width={'100%'}
                            chartType="Gantt"
                            loader={<div>Loading Chart</div>}
                            data={this.state.roleList}
                            chartEvents={[
                                {
                                    eventName: "ready",
                                    callback: ({ chartWrapper, google }) => {
                                        const chart = chartWrapper.getChart();
                                        function handler() {
                                            let selection = chart.getSelection();
                                            if(selection[0] === undefined || selection[0].row === 0){
                                                return;
                                            }
                                            let data = chartWrapper.getDataTable();
                                            let projectCode = data.getValue(0, 0);
                                            let accountNumber = data.getValue(0, 2);
                                            let roleId = data.getValue(selection[0].row, 0);


                                            window.location.href = `/Account/${accountNumber}/Project/${projectCode}/ViewRole/${roleId}`
                                        }

                                        google.visualization.events.addListener(
                                            chart,
                                            "select",
                                            handler
                                        );
                                    }
                                }
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"subtitle1"} color={"primary"}>
                            Click on each role to see more information.
                        </Typography>
                        <div style={{marginBottom: '50px'}}/>
                    </Grid>
                </Grid>
            </Paper>

        )
    }
}

function generateGanttChartRole(props, projectEndDate){

    let endDate = null;
    if(props.endDate !== null){
        endDate = new Date(props.endDate);
    } else {
        endDate = new Date(projectEndDate);
    }

    return [
        props.id,
        props.roleName,
        props.roleType,
        new Date(props.startDate),
        endDate,
        0,
        0,
        null,
    ]
}

export default RolesChart;