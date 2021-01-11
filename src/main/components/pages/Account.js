import React from "react";

import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import AccountImage from "./AccountImage";
import {uploadImageFile} from "../../services/imageService";


class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            account: props.location.state.account,
            fileToUpload: null,
            base64: null,
            updating: false
        }
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
            this.state.account.accountNumber,
            this.state.fileToUpload)

        if (uploaded.hasError) {
            return;
        }

        this.setState({
            updating: false
        })
        await this.componentDidMount();
    }

    render() {
        if (this.state.updating) {
            return (
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

            )
        } else {
            return (
                <Paper>
                    <AccountImage accountNumber={this.state.account.accountNumber}/>
                </Paper>
            )
        }
    }
}

export default Account;