import React from "react"
import { easeIn, easeInOut, motion } from "motion/react"

export default function Sample2({index,question}) {
    console.log(index);


    return(
        
                <div
                
                 className=" flex flex-row p-2 w-2 ">
                 <motion.div
                 
                 className="text-l w-full h-25  uppercase  bg-green-300 p-2 rounded-2xl "
                 
                 key={index}
                 initial={
                    {
                        x:-10000    
                    }
                }
                animate={{
                    rotate:360,
                    x:0
                }}
                transition={{
                    delay:index*0.5,
                    duration:1,
                    transform:easeInOut,
                    
                }}
                
                 >{question}</motion.div>
                </div>
    )
}