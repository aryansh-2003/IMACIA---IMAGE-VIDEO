import React, { useContext, useState } from "react";
import app from "./firebaseconfig"
import logo from "./logo of.png"
import { getAuth , createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import UserContext from "../context/UserContext";
import { motion } from "motion/react"
import { useNavigate } from "react-router";




export default function Signin(){

        const {setuserdata} = useContext(UserContext)
        const {setisloggedin} = useContext(UserContext)
        const auth = getAuth(app)
        const [email,setemail] = useState("")
        const [password,setpassword] = useState("")
        const [emailtoggle,setemailtoggle] = useState(false)
        const [passwordtoggle,setpasswordtoggle] = useState(false)
        const [loggedinoverlay,setloggedinoverlay] = useState(false)
        const [passwordresetoverlay,setpasswordresetoverlay] = useState(false)
        const [erroroverlay,seterroroverlay] = useState(false)
        const [username,setusername] = useState("")
        const Navigate = useNavigate()


        const signin = (e) =>{
            e.preventDefault()
            if(email==="") return setemailtoggle(true)
            setemailtoggle(false)
            if(password==="") return setpasswordtoggle(true)
            setpasswordtoggle(false)
            value()
            
            }
    

        const value = () => {
            signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
            const user = data;
            setloggedinoverlay(true)
            setuserdata(user)
            setusername(user.user.displayName)
            setTimeout(() => {
                Navigate("/Home")
            }, 700);
            
            
            // console.log(user)
            
            
            
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            seterroroverlay(true)
            
        });
        }

        const signuppage = () =>
        {
            Navigate("/Signup")
        }



    return(
        <> 
       
        <div className="w-full relative h-screen  flex items-center justify-center p-5 bg-[#0f171e] ">
            <div className="w-full  flex flex-col justify-center items-center">


            <div 
            className="w-full flex items-center justify-center">
            <img className="w-30"src={logo} alt="" />
          </div>

          {/* Login Sec */}
          <div
           animate={{x:-100}}
           className="w-full flex items-center justify-center mt-4">
                <div className="bg-[#1a242f] w-100 p-8 text-white rounded-xl" >
                    <h1 
                    className="text-2xl font-bold">Sign in</h1>
                    <div className="w-full mt-3 flex flex-col">
                        <label>Email</label>
                        <input 
                        onChange={(e)=>setemail(e.target.value)}
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="text"></input>
                         <p className={`text-red-800 flex items-center  ${emailtoggle ? "flex" : "hidden"}`}><svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Please enter your email!</p>
                         
                    </div>
                    <div className="w-full  mt-3 flex flex-col">
                        <label>Password</label>
                        <input
                        onChange={(e)=>setpassword(e.target.value)}  
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="te"></input>
                        <p className={`text-red-800 flex items-center  ${passwordtoggle ? "flex" : "hidden"}`}><svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Please enter your password!</p>
                    </div>
                    <div className="flex justify-end mt-1">
                        <button
                        onClick={()=>setpasswordresetoverlay(true)}
                         className="text-[#00a8e1] text-[12px] cursor-pointer">Forgot Password</button>
                    </div>
                    <div className="flex justify-end mt-4 ">
                        <motion.button
                        whileTap={{scale:0.8}}
                        onClick={signin}
                        className=" w-full bg-[#00a8e1] p-3 text-xl text-black cursor-pointer">Sign in</motion.button>
                    </div>
                    <div className="flex justify-end mt-4 ">
                      <p>New to Imacia? <button onClick={signuppage} className="text-[#00a8e1] cursor-pointer">Create an account</button></p>
                    </div>

                </div>
          </div>

          {/* Reset Password Sec */}

          <div
           className={`absolute top-0 right-0 left-0 bottom-0 backdrop-blur-2xl w-full flex items-center justify-center mt-4  ${passwordresetoverlay ? 'visible' : 'hidden'}`  }>
                <div className="bg-[#1a242f] w-100 p-8 text-white rounded-xl" >
                    <h1 
                    className="text-2xl font-bold">Password Reset</h1>
                    <div className="w-full mt-3 flex flex-col">
                    <motion.button
                    whileTap={{scale:0.7}}
                    onClick={()=>seterroroverlay(false)}
                    className="absolute right-0 mt-4 mr-4"><svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path fill="#ff0000" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg></motion.button> 
                        <label>Email</label>
                        <input 
                        onChange={(e)=>setemail(e.target.value)}
                        className="p-2 mt-1 border-1 border-[#2c3e50] bg-[#0f171e]" type="text"></input>
                         <p className={`text-red-800 flex items-center  ${emailtoggle ? "flex" : "hidden"}`}><svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Please enter your email!</p>
                         
                    </div>
                    
                    <div className="flex justify-end mt-4 ">
                        
                        <motion.button
                        whileTap={{scale:0.8}}
                        onClick={signin}
                        className=" w-full bg-[#00a8e1] p-3 text-xl text-black cursor-pointer">Sign in</motion.button>
                    </div>
                    

                </div>
          </div>
          
          </div>
          

          {/* Login sucess overlay */}


          <div className={`w-full absolute h-screen flex items-center justify-center ${loggedinoverlay ? "flex" : "hidden"}`}>
            <div className=" bg-[#0f171e] p-4 flex items-center h-50 rounded-2xl">
            <svg className="w-8 mr-2 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#f5a700" d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            <p className="text-xl text-white">Logging you in to Imacia! {username} </p>
            </div>
        </div>


        {/* Error Overlay */}

        <div className={`w-full absolute h-screen flex items-center justify-center ${erroroverlay ? "flex" : "hidden"}`}>
            <div className=" bg-[#0f171e] relative p-4 flex items-center h-50 rounded-2xl">
           <motion.button
           whileTap={{scale:0.7}}
           onClick={()=>seterroroverlay(false)}
            className="absolute right-0 top-0 mt-4 mr-4"><svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#ff0000" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg></motion.button> 
            <svg className="w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="#ff0000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            <p className="text-xl text-white">Invalid Email or Password </p>
            </div>
        </div>
          
        </div>

        </>

    )
}

