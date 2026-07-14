import { motion } from "motion/react";

export function PortfolioTransitionMask({active}) {

  if(!active) return null;

  return (
    <motion.div 
      initial={{opacity: 0.3, scaleY: 0}}
      animate={{opacity: 1, scaleY: 1}}
      transition={{delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
      className='fixed origin-bottom bottom-0 h-full w-full'
    >
      <div 
        className='
          h-80 w-full overflow-hidden bg-white
          [clip-path:polygon(0_95%,100%_85%,100%_100%,0_100%)]
          md:[clip-path:polygon(0_100%,100%_80%,100%_100%,0_100%)]
        ' 
      />
      <div className='fixed bottom-0 w-full h-[calc(100%-319px)] bg-white' />
    </motion.div>
  )

}