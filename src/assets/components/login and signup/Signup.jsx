import React, { useContext, useState } from "react";
import app from "./firebaseconfig"
import logo from "./logo of.png"
import { getAuth , createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import UserContext from "../context/UserContext";
import { motion } from "motion/react"
import { Navigate, useNavigate } from "react-router";




export default function Signup(){

        const auth = getAuth(app)
        const [erroroverlayvalue,seterroroverlayvalue] = useState("")
        const [email,setemail] = useState("")
        const [name,setname] = useState("")
        const [password,setpassword] = useState("")
        const [confirmpassword,setconfirmpassword] = useState("")
        const [emailtoggle,setemailtoggle] = useState(false)
        const [Nametoggle,setNametoggle] = useState(false)
        const [passwordtoggle,setpasswordtoggle] = useState(false)
        const [passwordtogglevalue,setpasswordtogglevalue] = useState(false)
        const [overlay,setoverlay] = useState(false)
        const [erroroverlay,seterroroverlay] = useState(false)
        const Navigate = useNavigate()


        const signin = (e) =>{
            e.preventDefault()
            if(name==="") return setNametoggle(true)
            setNametoggle(false)
            if(email==="") return setemailtoggle(true)
            setemailtoggle(false)
            if(password==="") return setpasswordtoggle(true), setpasswordtogglevalue("Please Enter Your Password!")
            if(password.length < 6) return setpasswordtoggle(true), setpasswordtogglevalue("Password should be 6 characters long")
            if(password != confirmpassword) return setpasswordtoggle(true), setpasswordtogglevalue("Passwords do not match")
            setpasswordtoggle(false)
            signupuser()
            
            }

            const loginpage = () =>{
                Navigate("/")
            }
    

       

        const signupuser = () =>{
            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                console.log(userCredential)
                const user = userCredential.user
                setoverlay(true)
                return updateProfile(user,{displayName : name ,photoURL : "66"}),
                setTimeout(() => {
                    Navigate("/")
                }, 1000);
                
                
            })
            .then(value => console.log(value))
            .catch((error)=>{
                const errorCode = error.code;
                seterroroverlay(true)
                seterroroverlayvalue(errorCode)
                
            
            })
        }


    return(
        <> 
       
        <div className="w-full relative h-screen flex items-center justify-center p-5 bg-[#0f171e] ">
            <div className="w-full  flex flex-col justify-center items-center">
            <div 
            className="w-full flex items-center justify-center">
            <img className="w-30"src={logo} alt="" />
          </div>
          <div
           animate={{x:-100}}
           className="w-full flex items-center justify-center mt-4">
                <div className="bg-[#1a242f] w-100 p-8 text-white rounded-xl" >
                    <h1 className="text-2xl font-bold">Sign up</h1>
                    <div className="w-full mt-3 flex flex-col">
                        <label>Your Name</label>
                        <input 
                        onChange={(e)=>setname(e.target.value)}
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="text"></input>
                         <p className={`text-red-800 flex items-center  ${Nametoggle ? "flex" : "hidden"}`}><svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Please enter your name!</p> 
                    </div>
                    <div className="w-full mt-3 flex flex-col">
                        <label>Email</label>
                        <input 
                        onChange={(e)=>setemail(e.target.value)}
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="text"></input>
                         <p className={`text-red-800 flex items-center  ${emailtoggle ? "flex" : "hidden"}`}><svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Please enter your email!</p> 
                    </div>
                    <div className="w-full mt-3 flex flex-col">
                        <label>Password</label>
                        <input 
                        onChange={(e)=>setpassword(e.target.value)}
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="text"></input>
                         <p className={`text-red-800 flex items-center  ${passwordtoggle ? "flex" : "hidden"}`}><svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>{passwordtogglevalue}</p> 
                    </div>
                    <div className="w-full mt-3 flex flex-col">
                        <label>Confirm Password</label>
                        <input
                        onChange={(e)=>setconfirmpassword(e.target.value)}  
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="password"></input>
                    </div>
                    <div className="flex justify-end mt-1">
                        <button  className="text-[#00a8e1] text-[12px] cursor-pointer">Forgot Password</button>
                    </div>
                    <div className="flex justify-end mt-4 ">
                        <button 
                        onClick={signin}
                        className=" w-full bg-[#00a8e1] p-3 text-xl text-black cursor-pointer">Sign up</button>
                    </div>
                    <div className="flex justify-end mt-4 ">
                      <p>Already a user? <button onClick={loginpage} className="text-[#00a8e1] cursor-pointer">Login Here</button></p>
                    </div>

                </div>
          </div>
          
          </div>
          <div className={`w-full absolute h-screen flex items-center justify-center ${overlay ? "flex" : "hidden"}`}>
            <div className=" bg-[#0f171e] p-4 flex items-center h-50 rounded-2xl">
            <svg className="w-8 mr-2 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#f5a700" d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            <p className="text-xl text-white">Registeration Succesfull  </p>
            </div>
        </div>
        <div className={`w-full absolute h-screen flex items-center justify-center ${erroroverlay ? "flex" : "hidden"}`}>
            <div className=" bg-[#0f171e] relative p-4 flex items-center h-50 rounded-2xl">
           <motion.button
           whileTap={{scale:0.7}}
           onClick={()=>seterroroverlay(false)}
            className="absolute right-0 top-0 mt-4 mr-4"><svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#ff0000" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg></motion.button> 
            <svg className="w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="#ff0000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            <p className="text-xl text-white">{erroroverlayvalue} </p>
            </div>
        </div>
          
        </div>

        </>

    )
}

