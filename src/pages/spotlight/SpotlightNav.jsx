import { Circle, CircleDot, MoveLeft, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom"

import Spotlight from '../../data/spotlight.json';
import { AnimatePresence, motion } from "motion/react";


export function SpotlightNav({active, enteringPortfolio, handleNext, handlePrevious, handleActiveChanged, handleEnterPortfolio}) {

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {
        !enteringPortfolio && 
        <motion.div 
          initial={{opacity: 0.8, bottom: 0}}
          exit={{opacity: 0, bottom: -50}}
          transition={{duration: 0.1}}
          className='absolute w-full flex flex-col items-center mb-8 text-white tracking-widest'
        >

          <div className='w-full max-w-200 flex justify-center gap-12'>
            <div onClick={handlePrevious} className='select-none flex items-center justify-start gap-4 text-sm md:w-24 cursor-pointer brightness-100 hover:brightness-80 transition-all'>
              <MoveLeft size={20} />
              <p className='not-md:hidden'>LAST</p>
            </div>
            <div className='flex'>
              <button onClick={handleEnterPortfolio} className='border border-white py-2 px-8 cursor-pointer brightness-100 hover:brightness-80 transition-all'>ENTER PORTFOLIO</button>
            </div>
            <div onClick={handleNext} className='select-none flex items-center justify-end gap-4 text-sm md:w-24 cursor-pointer brightness-100 hover:brightness-80 transition-all'>
              <p className='not-md:hidden'>NEXT</p>
              <MoveRight size={20} />
            </div>
          </div>

          <div className='mt-4 w-full max-w-60 flex justify-center gap-2'>
            {
              Spotlight.map((s, i) => {
                return (
                  <div onClick={() => handleActiveChanged(i)} key={i} className='flex w-4 justify-center items-center cursor-pointer hover:brightness-80 transition-all'>
                    {
                      i === active 
                      ? <CircleDot size={16} />
                      : <Circle size={10} />
                    }
                  </div>
                )
              })
            }
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )

}