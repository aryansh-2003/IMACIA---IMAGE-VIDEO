import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>{
    const [userdata,setuserdata] = useState(null)
    const [inputvalue,setinputvalue] = useState("trending")
    const [isloggedin,setisloggedin] = useState(false)
    const [nextPageUrl,setnextPageUrl] = useState()
    const [Pagetype,setPagetype] = useState("photo")
    return(
        <UserContext.Provider value ={{userdata,setuserdata,inputvalue,setinputvalue,isloggedin,setisloggedin,nextPageUrl,setnextPageUrl,Pagetype,setPagetype}}>
        {children}
        </UserContext.Provider>
    )   
}

export default UserContextProvider