import { AnimatePresence, motion } from "motion/react";

import Background from '../../assets/backgrounds/spotlight.png';
import Spotlight from '../../data/spotlight.json';
import Productions from '../../data/productions.json';
import Venues from '../../data/venues.json';
import Companies from '../../data/companies.json';

import { useEffect, useState } from "react";
import { SpotlightHeader } from "./SpotlightHeader";
import { useTailwindScreen } from "../../components/TailwindScreen";
import { useNavigate } from "react-router-dom";
import { SpotlightNav } from "./SpotlightNav";
import { PortfolioTransitionMask } from "./PortfolioTransitionMask";
import { createSpotlightEntry } from "../spotlight-viewer/createSpotlightEntry";


export function SpotlightPage() {

  // Carousel interval in seconds
  const CAROUSEL_INTERVAL = 8;

  const [enteringPortfolio, setEnteringPortfolio] = useState(false);

  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const [production, setProduction] = useState(null);
  const [venueOrCompany, setVenueOrCompany] = useState(null);
  const [bg, setBg] = useState(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  const { is } = useTailwindScreen();
  const navigate = useNavigate();

  const handleNext = () => {
    setActive(prev => (prev + 1) % Spotlight.length);
    setInteracted(true);
  }

  const handlePrevious = () => {
    setActive(prev => (prev + Spotlight.length - 1) % Spotlight.length);
    setInteracted(true);
  }

  const handleActiveChanged = (target) => {
    setActive(target);
    setInteracted(true);
  }

  const handleSeeMore = () => {
    if(Spotlight[active].link) {
      window.open(Spotlight[active].link, '_blank');
    }
    else {
      navigate(`/s/${production.slug}`);
    }
  }

  const handleEnterPortfolio = () => {
    setEnteringPortfolio(true);
    setTimeout(() => {
      navigate('/credits');
    }, 750);
  }
  
  useEffect(() => {
    Productions.forEach((p) => {
      if(Spotlight[active].slug === p.slug) {
        const vOrC = p.venue ? Venues[p.venue].name : Companies[p.company].name;
        setVenueOrCompany(vOrC);
        const bgImage = SpotlightImg(p.slug, Spotlight[active].ext);
        setBgLoaded(false);
        setBg(bgImage);
        setProduction(p);
      }
    })
  }, [active])

  // Carousel interval
  useEffect(() => {
    const interval = setInterval(() => {
      if(!interacted) { 
        setActive(prev => (prev + 1) % Spotlight.length);
      }
    }, (1000 * CAROUSEL_INTERVAL));

    return () => clearInterval(interval);
  }, [interacted])


  return (
    <div className='fixed inset-0 bg-black'>

      <AnimatePresence>
        {
          !(enteringPortfolio) && 
          <motion.div 
            initial={{scale: 1, opacity: 1, filter: 'blur(0)'}}
            exit={{scale: 1.1, opacity: 0, filter: 'blur(40px)'}}
            transition={{duration: 1}}
            className='absolute w-full h-dvh flex justify-end items-center overflow-hidden'
          >
            <AnimatePresence mode='wait'>
              <motion.img 
                key={active}
                className='w-full lg:w-4/7 h-full object-cover scale-110 -z-100'
                src={bg || undefined} 
                initial={{
                  opacity: 0,
                  x: 30,
                  filter: 'blur(12px)'
                }}
                animate={{
                  opacity: bgLoaded ? (is('lg') ? 1 : 0.3) : 0,
                  x: 0,
                  filter: bgLoaded ? 'blur(0px)' : 'blur(20px)'
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                  filter: 'blur(10px)'
                }}
                transition={{
                  opacity: { duration: 1, ease: "easeOut" },
                  x: {
                    type: "spring",
                    stiffness: 45,
                    damping: 22,
                    mass: 1.4
                  },
                  filter: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
                }}
                onLoad={() => setBgLoaded(true)}
              />
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.div 
                key={`${active}-1`}
                className='not-lg:hidden absolute left-0 w-full h-full flex'
                initial={{ x: 30 }}
                animate={{ x: 0 }}
                exit={{ x: -20 }}
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 45,
                    damping: 22,
                    mass: 1.4
                  },
                }}
              >
                <div className='w-3/7 h-full bg-black' />
                <div className='bg-linear-to-r from-black to-transparent w-120 h-full' />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        }
      </AnimatePresence>

      <SpotlightHeader enteringPortfolio={enteringPortfolio} />

      {
        (production && !enteringPortfolio) 
        ? <AnimatePresence mode='wait'>
            <motion.div
              key={production.slug} 
              className='absolute top-1/2 -translate-y-1/3 w-full px-10'
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.4, delay: 0.2}}
            >
              <div className='text-white tracking-widest ml-[5%] md:ml-[10%]'>
                <p className='opacity-80'>now in the spotlight</p>
                <h1 className='my-4 uppercase font-bold tracking-[10px] text-3xl md:text-4xl'>{production.name}</h1>
                <hr className='w-20 mb-4 opacity-60' />
                <p><span className='opacity-80'>{venueOrCompany} •</span> {production.upcoming ? <span className='text-[#e74c3c] font-bold'>UPCOMING</span> : <span className='opacity-80'>{production.year}</span>}</p>
                <p className='italic opacity-80'>
                  {
                    production.roles.map((r, i) => {
                      return `${r}${i === production.roles.length-1 ? '' : ' • '}`
                    })
                  }
                </p>
                <p onClick={() => handleSeeMore(production)} className='text-sm text-[#e74c3c] mt-5 w-20 opacity-90 hover:underline hover:opacity-100 transition-all cursor-pointer'>{(createSpotlightEntry(production.slug).link) ? createSpotlightEntry(production.slug).link_label : 'see more'}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        : <div />
      }

      <SpotlightNav
        active={active}
        enteringPortfolio={enteringPortfolio}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleActiveChanged={handleActiveChanged}
        handleEnterPortfolio={handleEnterPortfolio}
      />

      <PortfolioTransitionMask active={enteringPortfolio} />

    </div>
  )
}


function SpotlightImg(slug, ext) {
  if(!slug) return null;
  const base = import.meta.env.BASE_URL || '/';

  return `${base}spotlight/thumbnails/${slug}.${ext? ext : 'jpg'}`
}


function BgImg(bgLoaded, setBgLoaded, src, active) {
  return (
    <motion.img 
      key={active}
      className='w-full lg:w-2/3 h-full object-cover scale-120 -z-100'
      src={bg || undefined} 
      initial={{
        opacity: 0,
        x: 40,
        filter: 'blur(12px)'
      }}
      animate={{
        opacity: bgLoaded ? 1 : 0,
        x: 0,
        filter: bgLoaded ? 'blur(0px)' : 'blur(20px)'
      }}
      exit={{
        opacity: 0,
        x: -20,
        filter: 'blur(10px)'
      }}
      transition={{
        opacity: { duration: 1.4, ease: "easeOut" },
        x: {
          type: "spring",
          stiffness: 45,
          damping: 22,
          mass: 1.4
        },
        filter: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
      }}
      onLoad={() => setBgLoaded(true)}
    />
  )
}