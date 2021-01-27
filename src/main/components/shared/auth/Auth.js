import React from "react";

import SsoAuth from "./SsoAuth";
import InternalAuth from "./InternalAuth";

export default function Auth(){
    return(
        <div>
            <SsoAuth/>
            <InternalAuth/>
        </div>
    )
}