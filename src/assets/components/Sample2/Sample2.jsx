import { motion } from "motion/react"
import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import bg_1 from "./alpe-di-siusi-sunrise-with-sassolungo-or-langkofel-royalty-free-image-1623254127.avif"


export default function Sample1() {

    const {isloggedin} = useContext(UserContext)
    const {nextPageUrl} = useContext(UserContext)
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


    console.log("imageurl incoming",nextPageUrl)



    useEffect(() => {
        setquery(inputvalue);
      }, [inputvalue]);

      // console.log(userdata)

      

    // Image Loader
   useEffect(() =>{
    setloader(true)
    fetch(`https://api.pexels.com/v1/search/?page=${pageno}&query=${query}&per_page=10`,{
        headers:{
            Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc"
        }
    })
    .then((res)=>{return res.json()})
    .then((data)=>{setimagedata(data) , setError(null),setloader(false)})
    .catch((err)=>{
        console.error("fetch error:",err)
        setError("connect to internet ")
        setloader(false)
        
    })
   },[query,counter])

  //  Video Loader
   useEffect(() =>{
    setloader(true)
    fetch(`https://api.pexels.com/videos/search?page=${pageno}&query=${query}&per_page=10`,{
        headers:{
            Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc"
        }
    })
    .then((res)=>{return res.json()})
    .then((data)=>{setvideodata(data) , console.log(data),setError(null),setloader(false)})
    .catch((err)=>{
        console.error("fetch error:",err)
        setError("connect to internet ")
        setloader(false)
        
        
    })
   },[query,counter])


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
     setimageoverlay(nextPageUrl)
   }

    
   console.log(imagedata)
   
  
    return(
        
      <div
    //   style={{
    //     backgroundImage: `url(${bg_1})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center'
    //   }}
      className={` w-full md:pt-10 md:pb-20 p-5  text-black transition-all transform-easeIn relative ${isloggedin ? "visible" : "hidden"}`}>
         {/* {isOpen && (
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
            className="absolute h-screen  p-  md:w-full   backdrop-blur-md bg-black/70  flex items-center  ">
            <motion.button
            className="pr-2 absolute top-0 right-0 md:p-10 cursor-pointer"
            onClick={()=>setIsOpen(false)}    
            whileTap={{scale:0.8}}
            >  
            <svg className=" w-10 md:w-10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e60a0a" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </motion.button>
                <img className=" w-full h-200   bottom-0 " src={imageoverlay} alt="" />
            </motion.div>
            
            )} */}
         
        <div className="w-full text-black text-2xl">
            <div className=" p-4 w-full flex flex-col items-center justify-center">
              <div className="w-full mb-2 flex justify-center items-center">
                    <div className=" flex  justify-center items-center rounded-2xl overflow-hidden border-2 border-gray-200 ">
                          <div className="w-ful mb-2 pl-6 pr-6 flex flex-col mt-2">
                            <div className="flex  flex-row justify-between  items-center">
                              
                                    <div className=" flex items-center justify-center gap-8 ">
                                      <div className="flex flex-row items-center text-[16px]">
                                            <button className="w-8 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="#000000" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                                            </button> <p> 16k </p>
                                      </div>
                                      <div >
                                              <button className="w-8">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                              <path fill="#000000" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"/></svg>
                                              </button>
                                      </div>
                                      <div>
                                        
                                            <button className="w-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="#000000" d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg>
                                            </button>
                                      </div>
                                   
                                   
                                    </div>
                                    <div className=" flex justify-evenly relative  ">
                                    <button className="p-4 text-[18px] rounded-3xl bg-[#e60023] text-white">
                                      Save
                                    </button> 
                                          <motion.div
                                          animate={{scale:[1,0.7,1],
                                               opacity:[0.4,1]
                                              }}
                                              transition={{
                                                duration:2,
                                                repeat:Infinity}}

                                          className="border-5 w-30 h-30 -top-7 absolute rounded-full border-blue-800">
                                                  
                                          </motion.div>
                                    </div>

                            </div>
                             
                              
                              <div className="w-full flex items-center justify-center">
                                <div className="flex justify-center items-center w-full ">
                                      <div 
                                      style={{aspectRatio : "0 / 0.1",width: 'calc(12 / var(--g-cols) * 100%)'}}
                                      className=" pl-10 pr-10 overflow-hidden object-contain w-60  aspect-[0.5 / 1] rounded-b-4xl items-center justify-center contents">
                                          
                                                  <div className="w-[25%]">
                                                       <img
                                                       className="rounded-4xl   object-contain  top-0 bottom-0   " src={nextPageUrl} alt="" />

                                                  </div>                                                
                                                  
                                      </div>     
                                </div>
                                      
                                    </div>
                                  

                                        <div className="w-full mt-2 mb-2 ">
                                          <div className=" flex flex-row items-center">
                                            <div>
                                              <img className=" w-8 h-8 rounded-full" src={bg_1}></img>
                                            </div>
                                            <div className=" ml-2">
                                                <p className=" text-[16px]">Senorita</p>
                                            </div>
                                          </div>
                                        </div>
                          </div>
                          
                      </div>
              </div>
 
                <div className="columns-2 md:columns-3 lg:columns-4">
                      {
                  activetab === "Home" ? (
                    <>
                    {imagedata.photos?.map((photo, index) => (
                        
                      <button onClick={() => imagesize(index)} className="cursor-pointer" key={index}>
                        <motion.img
                        className="w-full  rounded-5xl "
                          whileTap={{ scale: 0.5 }}
                          src={photo.src?.portrait}
                          alt=""
                        />
                      </button>
                    ))}
                         
              {videodata.videos?.map((video,index) => (
                <button onClick={() => imagesize(index)}
                className="cursor-pointer">
              <motion.video 
              className="w-full rounded-4xl "
                autoPlay muted loop
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
               <div className="font-bold font-sans  w-full flex items-center"> 
               {error}
               
               </div> 
             
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