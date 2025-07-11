import React, { useEffect, useState } from "react";
import Logo from "./logo of.png"
import { motion } from "motion/react"
import { useContext } from "react";
import UserContext from "../context/UserContext";



export default function Header(){


    const [image,setimage] = useState()
    const [imagedata,setimagedata] = useState()
    const {isloggedin,setisloggedin} = useContext(UserContext)
    const [username,setusername] = useState("")
    const {userdata} = useContext(UserContext)
    const [query, setquery] = useState("dog")
    const {setinputvalue} = useContext(UserContext)



    useEffect(() =>{
        fetch(`https://api.pexels.com/v1/search/?page=1&query=nature&per_page=40`,{
            headers:{
                Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc"
            }
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            setimage(data.photos?.[Math.floor(Math.random()*(40-1)+1)]?.src.original)
            setimagedata(data)
        })
        .catch((err)=>{
            console.error("fetch error:",err)
            
        })
       },[])

    

    useEffect(()=>{
        if (userdata) {
            let user = userdata.user.displayName
            setusername(user)
            setisloggedin(true)
        }else{
            setisloggedin(true)
        }
    },[userdata])
 

   const querysetter = () =>{
        setinputvalue(query)
   }
     

    return(
        <header className="shadow bg-center md:min-h-125  z-100 relative bg-white top-0  flex flex-col w-full items-center backdrop-blur-3xl"
        style={{backgroundImage:`url(${image})`,WebkitBackgroundSize:"cover"}}>
         

            <div className={`w-full backdrop-blur-2xl h-screen absolute z-200 items-center justify-center  ${isloggedin ? "hidden" : "flex"} `}>
                <div className=" p-20 bg-[#0f171e] flex flex-col justify-center items-center rounded-2xl">
                    <p className="text-3xl text-white">Please Log in First</p>
                    <button className="text-[#00a8e1] text-2xl cursor-pointer mt-4">Log in</button>
                </div>
            </div>


            <nav className=" flex w-full flex-row justify-around ">
                
                <div className="">
                <img className="w-20" src={Logo} alt="" 
                />
                </div>

                <div className="w-full flex justify-end p-2">
                    <div className="p-1 flex items-center justify-center ">
                        <button className="flex mr-4 items-center justify-around text-xl text-white">
                        <svg className="w-8 mr-2 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#f5a700" d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                        <p>{username}</p>
                        </button>
                        <button className="pt-2 pb-2 pl-3 pr-3 bg-black text-white rounded-2xl">
                            Upload
                        </button>
                    </div>
                </div>

             </nav>

             <div className="md:w-full  min-h-100   flex items-center justify-center" >
                <div className="font-mono pt-12 md:text-3xl text-white flex flex-col items-center justify-center">
                    <p className=" font-serif text-2xl">The best free stock photos, royalty free images & videos shared by creators.</p>
                    <div className=" w-full p-2  mt-8 relative  flex flex-row items-center justify-center
                    ">
                    <input className="w-full bg-white  border-none rounded-2xl p-3  text-gray-800 text-[20px] " placeholder="Search Images & Videos"  type="text"
                    onChange={(e)=>setquery(e.target.value)}
                    >
                    </input>
                         
                         <motion.button
                         type="button"
                         onClick={querysetter}
                         whileTap={{scale:0.8}}
                         className=" w-10 pb-2 mr-2 pr-3 pt-1 absolute right-0"><img src="https://upload.wikimedia.org/wikipedia/meta/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png" alt="" />
                         </motion.button>
                    </div>
                    
                </div>
             </div>
             
            
        </header>
    )
}