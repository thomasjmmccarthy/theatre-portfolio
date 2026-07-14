import { motion } from 'motion/react';
import Logo from '../../assets/logo/logo.png';
import Instagram from '../../assets/icons/instagram.png';
import { useTailwindScreen } from '../../components/TailwindScreen';

export function SpotlightHeader({enteringPortfolio}) {

  const { is } = useTailwindScreen();

  return (
    <div 
      style={{height: (!is('lg') || enteringPortfolio) ? '320px' : '240px'}}
      className='w-full relative z-100 group transition-all duration-500'
    >
      <div className='relative h-full w-full overflow-hidden'>
        <div className='relative h-full w-full flex justify-center items-center'>
          <motion.img
            className='w-[80%] max-w-100'
            src={Logo}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0)' }}
            transition={{ duration: 1, delay: 0.15, type: 'spring' }}
          />
        </div>
      </div>
      <div onClick={() => {window.open('https://instagram.com/thomasmccarthy.creative', '_blank')}} className='group/instagram absolute top-5 right-5 w-10 bg-white/0 hover:bg-white opacity-70 hover:opacity-100 cursor-pointer p-2 rounded-full transition-all'>
        <img className='w-full group-hover/instagram:brightness-0 transition-all' src={Instagram} />
      </div>
    </div>
  )
}