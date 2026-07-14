import { useState } from "react";
import { SVLabel } from "./SVLabel";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";


export function SVCarousel({label, gallery=[]}) {

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  if(!gallery || !gallery.length) return null;

  const handleActiveChanged = (i) => {
    setSelected((i+gallery.length) % gallery.length);
  }

  return (
    <>

      {/* OVERLAY VIEWER */}
      <AnimatePresence>
        {open &&
          <motion.div 
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.1}}
            className='fixed z-100 inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center'
            onClick={() => setOpen(false)}
          >
            <motion.div 
              initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{type:'spring',duration:0.5,delay:0.1}} 
              className='w-[95%] h-[85%] max-h-200 flex flex-col justify-center items-center'
            >
              <img className='max-w-full max-h-full object-contain' src={gallery[selected].src} />
              <p className='mt-4 font-bold uppercase tracking-wide'>{gallery[selected].title}</p>
              <p className='text-[#aaa] text-xs'>click anywhere to close</p>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      { /* IN-PAGE VIEWER */ }
      <div className='w-full py-8 flex flex-col items-center'>
        
        {
          label && 
          <div className='w-full text-start'>
            <SVLabel>{label}</SVLabel>
          </div>
        }

        <div className='w-full bg-[#111] rounded-sm p-4 md:mt-4 flex flex-col items-center'>

          <div className='relative w-full h-100 md:h-110 flex items-center justify-center'>
            <div className='relative w-full flex justify-center max-h-100 md:max-h-110'>
              <div onClick={() => handleActiveChanged(selected-1)} className='z-1 absolute -left-4 w-10 md:w-15 h-full flex justify-center items-center bg-linear-to-r from-[#111] to-transparent hover:text-[#e74c3c] cursor-pointer transition-all' >
                <ChevronLeft size={30} />
              </div>
              <AnimatePresence mode='wait'>
                <motion.div key={selected} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}} className='w-full max-w-240 flex justify-center'>
                  <img onClick={() => setOpen(true)} className='hover:brightness-90 cursor-pointer transition-all' src={gallery[selected].src} />
                </motion.div>
              </AnimatePresence>
              <div onClick={() => handleActiveChanged(selected+1)} className='z-1 absolute -right-4 w-10 md:w-15 h-full flex justify-center items-center bg-linear-to-l from-[#111] to-transparent hover:text-[#e74c3c] cursor-pointer transition-all' >
                <ChevronRight size={30} />
              </div>
            </div>
          </div>

          <h1 className='mt-2 uppercase tracking-wide font-bold text-xl'>{gallery[selected].title}</h1>
          <p className='text-center not-md:text-xs'>{gallery[selected].caption}</p>

          <div className='mt-2 w-full max-w-60 flex justify-center gap-2'>
            {
              gallery.map((g, i) => {
                return (
                  <div onClick={() => handleActiveChanged(i)} key={i} className='flex w-4 justify-center items-center cursor-pointer hover:brightness-80 transition-all'>
                    {
                      i === selected 
                      ? <CircleDot size={16} />
                      : <Circle size={10} />
                    }
                  </div>
                )
              })
            }
          </div>
          
        </div>
      </div>
    </>
  )

}