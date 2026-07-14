import { motion } from "motion/react"

export function SVCornerImage({src}) {

  return (
    <div className='absolute md:w-1/2 lg:w-1/3 aspect-5/7 md:aspect-square -z-1 top-0 right-0 not-md:opacity-50 overflow-hidden'>
      <motion.div 
        initial={{filter: 'blur(8px) brightness(0)', x: 10}}
        animate={{filter: 'blur(0) brightness(1)', x: 0}}
        transition={{duration: 0.5}}
        className='w-full h-full'
      >
        <div className='absolute w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,black_100%)]' />
        <div className='absolute w-full h-full md:bg-[linear-gradient(to_left,transparent_0%,transparent_50%,black_100%)]' />
        <div className='absolute w-full h-full md:bg-[linear-gradient(to_bottom_left,transparent_0%,transparent_70%,black_100%)]' />
        <img src={src} className='w-full h-full object-cover' />
      </motion.div>
    </div>
  )

}