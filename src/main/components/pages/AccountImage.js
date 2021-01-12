import React from "react";
import PictureNotFound from "../../images/picture-not-found.png"
import {retrieveImageFile} from "../../services/imageService";

class AccountImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            defaultImage: PictureNotFound
        }
    }

    async componentDidMount() {
        const res = await retrieveImageFile(this.props.accountNumber);
        if (res === undefined || res.hasError) {
            return;
        }

        this.setState({
            image: res,
        })
    }

    render() {

        if(this.state.image == null){
            return (
                <div style={{width: '100%', background: 'white'}}>
                    <img src={this.state.defaultImage}
                         alt={"Cover for Account"}
                         style={{with: '200px', height: '90px'}}
                    />
                </div>
            )
        }

        return (
            <div style={{width: '100%', background: 'white'}}>
                <img src={`data:image/jpeg;base64,${this.state.image}`}
                     alt={"Cover for Account"}
                     style={{with: '200px', height: '75px'}}
                />
            </div>
        )

    }
}

export default AccountImage;