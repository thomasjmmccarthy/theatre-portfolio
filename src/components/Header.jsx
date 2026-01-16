import Logo from '../assets/logo/logo.png';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTailwindScreen } from './TailwindScreen';

export function Header() {

  const { is } = useTailwindScreen();
  const headerImage = is('sm') ? 'header.png' : 'mobile-header.png';

  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 300], [0, prefersReducedMotion ? 0 : 200]);
  const transform = useMotionTemplate`translate3d(0, ${y}px, 0) scale(1.12)`

  return (
    <div className='w-full h-80 relative group'>

      <div className='
        relative h-full w-full overflow-hidden bg-black
        [clip-path:polygon(0_0,100%_0,100%_85%,0_95%)]
        md:[clip-path:polygon(0_0,100%_0,100%_80%,0_100%)]
      '>
        {/* Background layer (parallax) */}
        <motion.div
          className='absolute inset-0 bg-cover bg-center pointer-events-none'
          style={{
            backgroundImage: `url('/headers/${headerImage}')`,
            transform,
            willChange: 'transform',
          }}
        />

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
      <p className='hidden md:block opacity-0 group-hover:opacity-100 duration-200 transition-all absolute right-4 bottom-3 text-xs text-[#555] select-none'>
        <i>Mirror Circle.</i> at the Drama Barn.<br />
        Photo: Ella Tomlin
      </p>
    </div>
  );
}
