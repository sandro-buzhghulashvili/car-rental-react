import React from "react";

const userContext = React.createContext({
    user : {
        username : "",
        password : "",
        pickUp : "",
        dropOff : ""
    }
})

export default userContext