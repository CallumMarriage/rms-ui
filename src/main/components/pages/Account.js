import React from "react";

import Paper from "@material-ui/core/Paper";
import {Button, Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import AccountImage from "./AccountImage";
import {uploadImageFile} from "../../services/imageService";
import {retrieveAccountInfo} from "../../services/accountService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../shared/Error";
import TitleContainer from "../shared/TitleContainer";
import {ProjectLink} from "../shared/Links";

const StyledPaper = withStyles({
    root: {
        width: '90%',
        margin: 'auto',
        padding: '10px'
    }
})(Paper)

const ItemPaper = withStyles({
    root: {
        marginTop: '20px'
    }
})(StyledPaper)

const StyledButton = withStyles({
    root: {
        width: '100%',
        marginTop: '10px'
    }
})(Button)

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            accountNumber: props.location.state.accountNumber,
            fileToUpload: null,
            base64: null,
            updating: false,
            account: null,
            projectList: null,
            hasError: false,
            loading: true
        }
    }

    async componentDidMount() {
        const res = await retrieveAccountInfo(this.state.accountNumber)

        if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        }

        console.log(res);

        this.setState({
            hasError: false,
            loading: false,
            account: res.account,
            projectList: res.projectList
        })
    }

    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = e => {
            let base64 = e.target.result.substring(23)
            this.setState({
                fileToUpload: e.target.result,
                base64: base64
            })
        };
    }

    setUpdating() {
        this.setState({
            updating: true
        })
    }

    setUpdatingFalse() {
        this.setState({
            updating: false
        })
    }

    async uploadImage() {
        const uploaded = await uploadImageFile(
            this.state.accountNumber,
            this.state.fileToUpload)

        console.log(uploaded)

        if (uploaded === undefined) {
            this.setState({
                updating: false
            })
            return;
        }
        if (uploaded.hasError) {
            alert('Failed to upload image')
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

        if (this.state.updating) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            <Grid container>
                                <Grid item xs={1}>
                                    <Button onClick={this.setUpdatingFalse.bind(this)}>
                                        X
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={`data:image/jpeg;base64,${this.state.base64}`}
                                         alt={"Cover for Account"}
                                         style={{with: '400px', height: '200px'}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input type="file"
                                           name="file"
                                           onChange={this.onChange.bind(this)}/>

                                    <Button onClick={this.uploadImage.bind(this)}>
                                        Upload Image
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            )
        } else {
            return (
                <Grid container style={{marginBottom: '100px'}}>
                    <TitleContainer title={this.state.account.accountName}/>

                    <Grid item xs={6}>
                        <Paper>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button onClick={this.setUpdating.bind(this)}>
                                        Update the account image
                                    </Button>
                                    <AccountImage accountNumber={this.state.accountNumber}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"}>
                                        All of the accounts on this project
                                    </Typography>
                                </Grid>
                                {this.state.projectList.map(project => {
                                    return (
                                        <Grid item xs={12} key={project.projectCode}>
                                            {
                                                ProjectLink(project, ProjectItem)
                                            }
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Paper>

                    </Grid>
                </Grid>
            )
        }
    }
}

function ProjectItem(props) {
    console.log(props)
    return (
        <ItemPaper key={props.props.projectCode}>
            <StyledButton>
                <Typography variant={"h6"}>
                    {props.props.projectName}
                </Typography>
            </StyledButton>
        </ItemPaper>
    )
}

export default Account;