'use state';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const AnimLayout = ({children,className,type=false}) => {

  let typeAnimate = {start : {},end :{}};

  // useEffect(() => {
    if(type){
      switch (type) {
        case 'fade':

          typeAnimate = {
            // ...typeAnimate,
            start : { opacity: 0.3,scale:0.9 },
            end : { opacity: 1,scale:1 }
          }
          break;

          case 'moveUp':
            
          typeAnimate={
            // ...typeAnimate,
            start : { opacity: 0, y:200 },
            end : { opacity: 1, y: 0,}
          };

          break;
        case 'sony':

          typeAnimate = {
            // ...typeAnimate,
            start : { opacity: 0.7, scaleX:0.3,scaleY:0.1 },
            end : { opacity: 1,scaleX:1,scaleY:1  }
          }
          break;          
        default:
      typeAnimate={
        // ...typeAnimate,
        start : { opacity: 0.3,y:300},
        end : { opacity: 1, }
      }
          break;
      }
    } else{
      typeAnimate={
        // ...typeAnimate,
        start : { opacity: 0.3,y:300},
        end : { opacity: 1, }
      }

    }

    console.log(type);
    
  // },[])

  return (
    <AnimatePresence>
        <motion.div
        initial={typeAnimate.start}
        animate={typeAnimate.end}
        exit={{ opacity: 0, y: -210, }}
        transition={{ duration: 0.1 }}
        className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    </AnimatePresence>
  )
}

export default AnimLayout