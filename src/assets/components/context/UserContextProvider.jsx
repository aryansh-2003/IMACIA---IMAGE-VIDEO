import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>{
    const [userdata,setuserdata] = useState(null)
    const [inputvalue,setinputvalue] = useState("trending")
    const [isloggedin,setisloggedin] = useState(true)
    return(
        <UserContext.Provider value ={{userdata,setuserdata,inputvalue,setinputvalue,isloggedin,setisloggedin}}>
        {children}
        </UserContext.Provider>
    )   
}

export default UserContextProvider