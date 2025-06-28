import { motion } from "motion/react"
import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"


export default function Sample1() {

    const {isloggedin} = useContext(UserContext)
    const {inputvalue} = useContext(UserContext)
    const [imagedata,setimagedata] = useState('')
    const [videodata,setvideodata] = useState('')
    const [error,setError] = useState(null)
    const [loader,setloader] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [imageoverlay,setimageoverlay] = useState()
    var [counter,setcounter] = useState(0)
    const [pageno,setpageno] = useState("1")
    const[query,setquery] = useState('trending')
    const[activetab,setactivetab] = useState('Home')
    console.log(inputvalue)

    useEffect(() => {
        setquery(inputvalue);
      }, [inputvalue]);

      // console.log(userdata)

      

    // Image Loader
  //  useEffect(() =>{
  //   setloader(true)
  //   fetch(`https://api.pexels.com/v1/search/?page=${pageno}&query=${query}&per_page=20`,{
  //       headers:{
  //           Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc"
  //       }
  //   })
  //   .then((res)=>{return res.json()})
  //   .then((data)=>{setimagedata(data) , setError(null),setloader(false)})
  //   .catch((err)=>{
  //       console.error("fetch error:",err)
  //       setError("connect to internet ")
  //       setloader(false)
        
  //   })
  //  },[query,counter])

   // Video Loader
  //  useEffect(() =>{
  //   setloader(true)
  //   fetch(`https://api.pexels.com/videos/search?page=${pageno}&query=${query}&per_page=20`,{
  //       headers:{
  //           Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc"
  //       }
  //   })
  //   .then((res)=>{return res.json()})
  //   .then((data)=>{setvideodata(data) , setError(null),setloader(false)})
  //   .catch((err)=>{
  //       console.error("fetch error:",err)
  //       setError("connect to internet ")
  //       setloader(false)
        
        
  //   })
  //  },[query,counter])


   var next = () =>{
        
    counter+=1
    setcounter(counter)
    setpageno(counter)
}
 
    var prev = () =>{
        if (counter===0) counter+=1
         counter-=1
         setcounter(counter)
         setpageno(counter)
   }
   
   const imagesize = (index) =>{
     setIsOpen(true)
     console.log("clicked",index)
     setimageoverlay(imagedata.photos?.[index]?.src?.original)
   }

    
   console.log(imagedata)
   
   console.log(videodata.videos?.[0]?.video_files?.[0].link)
  
    return(
        
      <div
      className={`w-full md:pl-1 md:pr-1 md:pt-10 md:pb-20 p-10  text-black transition-all transform-easeIn relative ${isloggedin ? "visible" : "hidden"}`}>
         {isOpen && (
            <motion.div
            initial={
                {
                    x:-900,
                    
                }
            }
            animate=
            
            {{x:0,
              scale:1
            }}
            className=" h-200 p-  md:w-full md:h- inset-0 backdrop-blur-2xl z-100 absolute md:p-10 md:pb-10 flex items-center top-0 left-0 md:top-100 bottom-0 right-0 ">
            <motion.button
            className="pr-2 absolute top-0 right-0 md:p-10 cursor-pointer"
            onClick={()=>setIsOpen(false)}    
            whileTap={{scale:0.8}}
            >  
            <svg className=" w-10 md:w-10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e60a0a" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </motion.button>
                <img className=" w-full h-200   bottom-0 " src={imageoverlay} alt="" />
            </motion.div>
            
            )}
         
        <div className="w-full text-black text-2xl">
          <div className="w-full flex flex-col items-center ">
          <div className="w-full flex flex-row p-4 items-center justify-center">
            <button onClick={()=>setactivetab("Home")}  className={`p-3 mr-3 rounded-full  text-black text-[18px]  border-2 border-black cursor-pointer hover:text-black ${activetab ==="Home" ? "bg-transparent text-black" :"bg-black text-white"}`}> Home</button>
            <button onClick={()=>setactivetab("Photos")}  className={`p-3 mr-3 rounded-full  text-black text-[18px]  border-2 border-black cursor-pointer hover:text-black ${activetab ==="Photos" ? "bg-transparent text-black" :"bg-black text-white"}`}> Photos</button>
            <button onClick={()=>setactivetab("Videos")}  className={`p-3 mr-3 rounded-full  text-black text-[18px]  border-2 border-black cursor-pointer hover:text-black ${activetab ==="Videos" ? "bg-transparent text-black" :"bg-black text-white"}`}> Videos</button>
          </div> 
          <p className="pl-3 w-60 font-serif">Free Stock {activetab}</p>

            
          </div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
               <div className="font-bold font-sans  w-full flex items-center"> 
               {error}
               
               </div> 
               {
                  activetab === "Home" ? (
                    <>
                    {imagedata.photos?.map((photo, index) => (
                      <button onClick={() => imagesize(index)} className="cursor-pointer" key={index}>
                        <motion.img
                          className="pt-4 rounded-4xl"
                          whileTap={{ scale: 0.5 }}
                          src={photo.src?.original}
                          alt=""
                        />
                      </button>
                    ))}
                         
              {videodata.videos?.map((video,index) => (
                <button onClick={() => imagesize(index)}
                className="cursor-pointer">
              <motion.video 
                autoPlay muted loop
                className=" pt-4 rounded-4xl "
                whileTap={{scale:0.5}}
                key={index}
                src={video?.video_files?.[0].link} 
                alt="" />  
                </button>
            ))}
            </>
            ) : activetab=== "Photos" ? (
                    imagedata.photos?.map((photo, index) => (
                      <button onClick={() => imagesize(index)} className="cursor-pointer" key={index}>
                        <motion.img
                          className="pt-4 rounded-4xl"
                          whileTap={{ scale: 0.5 }}
                          src={photo.src?.original}
                          alt=""
                        />
                      </button>
                    ))
                  ) : activetab === "Videos" ? (
                    videodata.videos?.map((video,index) => (
                      <button onClick={() => imagesize(index)}
                      className="cursor-pointer">
                    <motion.video 
                      autoPlay muted loop
                      className=" pt-4 rounded-4xl "
                      whileTap={{scale:0.5}}
                      key={index}
                      src={video?.video_files?.[0].link} 
                      alt="" />  
                      </button>
                  ))
                  ):null
                }
            </div>
           
        </div>
        {loader && (
              <motion.div className=" w-full p-20 flex items-center justify-center"
              >
                <p className="text-2xl">Loading Content....</p>
                <motion.div 
                  animate={{ rotate:360}}
                  transition={{repeat:Infinity}}
                className=" ml-2 border-b-2 border-blue-500 p-4 rounded-full"></motion.div>
              </motion.div>
            
            )}
        
        <div className="w-full text-white font-bold flex items-center justify-center p-5">
        
      <motion.button 
       whileTap={{scale:0.8}}
      className="p-2 w-10 bg-red-800 mr-30 text-xl rounded-2xl"
      onClick={prev}
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></motion.button>
      <motion.button 
        whileTap={{scale:0.8}}
        className="p-2 text-2xl w-10  bg-purple-800 rounded-2xl"
      onClick={next}
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></motion.button>
        </div>
      
      
      </div>
      
    )
}