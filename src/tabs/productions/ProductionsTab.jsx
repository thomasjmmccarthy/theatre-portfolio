import productions from '../../data/productions.json';
import companies from '../../data/companies.json';
import venues from '../../data/venues.json';
import categories from '../../data/role-categories.json';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SlidersVertical, Images } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGallery } from './gallery-viewer/getGallery';
import { useTailwindScreen } from '../../components/TailwindScreen';

import SmallLogo from '../../assets/logo/small-logo.png';


export function ProductionsTab() {

  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const filter = useMemo(() => pathname.replace(/^\/+/, '').split('/')[0] || '', [pathname]);

  const filteredProductions = useMemo(() => {

    if(!filter) return productions.filter((x) => !x.upcoming);

    if(!(filter === 'other' || filter === 'upcoming')) {
      return productions.filter((x) => {
        for(const r of x.roles) {
          if(categories[filter].roles.includes(r) && !x.upcoming) return true;
        }
        return false;
      });
    }
    else if(filter === 'other') {
      // Other filter: If one of the roles doesn't feature in any category
      return productions.filter((x) => {
        for(const r of x.roles) {
          let isOther = true;
          for(const c of Object.keys(categories)) {
            if(categories[c].roles.includes(r)) isOther = false;
          }
          if(isOther) return true;
        }
        return false;
      })
    }
    else {
      // Upcoming filter: only shows productions with the 'upcoming' flag
      return productions.filter((x) => x.upcoming);
    }
  }, [productions, filter])

  const [showUpcoming, setShowUpcoming] = useState(null);

  // If there are upcoming productions, show the 'Upcoming' filter.
  useEffect(() => {
    const upcomingShows = productions.filter((x) => x.upcoming);
    setShowUpcoming(upcomingShows.length ? true : false);

    if(filter === 'upcoming' && !upcomingShows.length) {
      navigate('/');
    }
  }, [filter])

  useLayoutEffect(() => {
    console.log("Called with", state);
    if(typeof state?.restoreScrollY === 'number') {
      console.log("Restoring scrollY to", state.restoreScrollY);
      window.scrollTo(0, state.restoreScrollY);
      // Clear the state so refresh doesn't cause jump
      navigate(pathname, { replace:true, state:null });
    }
  }, [state, pathname, navigate]);

  let creditCount;
  let oldestYear;
  let newestYear;
  if(filteredProductions.length) {
    creditCount = filteredProductions.length;
    oldestYear = filteredProductions[filteredProductions.length-1].year;
    newestYear = filteredProductions[0].year;
  }

  const [filterIconColour, filterColour] = 
    filter === '' ? ['#ccc', '#ddd']
    : filter === 'upcoming' ? ['#e84393', '#fd79a8']
    : ['#00b894', '#00b894'];

  return (
    <div className='w-full'>

      <div className='w-full flex md:justify-between mb-4'>
        <p className='hidden md:block'>
          {creditCount} productions ({oldestYear} - {newestYear})
        </p>
        <div className='flex gap-2 items-center w-full md:w-auto'>
          <SlidersVertical size={18} style={{color: filterIconColour}} className='mb-0.5 transition-all' />
          <select value={filter} onChange={(e) => navigate(`/${e.target.value}`, {replace:true})} className='transition-all uppercase border-b-2 focus:outline-0 w-full md:w-auto' style={{borderColor: filterColour}}>
            <option value=''>All</option>
            { Object.keys(categories).map((c) => <FilterOption c={c} category={categories[c]} />) }
            <option value='other'>Other</option>
            { showUpcoming && <option disabled>──────────</option> }
            { showUpcoming && <option value='upcoming'>Upcoming</option> }
          </select>
        </div>
      </div>

      <AnimatePresence initial={false} mode="popLayout">{
        filteredProductions.map((p) => <ProductionItem key={p.slug} p={p} filter={filter} />)
      }</AnimatePresence>

    </div>
  )

}


function ProductionItem({p, filter}) {

  const thumbnail = Thumbnail(p.slug, p.photo?.ext);
  const hasGallery = getGallery(p.slug).length > 0;
  const writerDirector = (p.writer === p.director);

  const { is } = useTailwindScreen();
  const navigate = useNavigate();

  const variants = {
    hidden: () => ({
      opacity: 0,
    }),
    visible: () => ({
      opacity: 1,
    }),
    exit: () => ({
      opacity: 0,
    })
  }

  return (
    <motion.div 
      key={p.slug} 
      layout
      className='px-2 py-6 md:py-4 border-t-2 flex items-start justify-between overflow-hidden relative'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
      transition={{duration: 0.2}}
    >
      <div className='md:h-48.75 w-full md:w-auto flex flex-col items-center md:items-start md:flex-row gap-3 md:gap-6'>
        {
          !p.upcoming 
          ?
            <div className='relative h-62.5 md:h-full w-50 min-w-50 md:w-39 md:min-w-39 mt-4 md:mt-0 overflow-hidden group border-2 rounded-sm md:rounded-none md:border-0'>
              <img 
                src={thumbnail} 
                className='absolute group-hover:saturate-0 group-hover:brightness-90 transition-all w-full h-full object-cover object-center'
              />
              {
                p.photo?.credit && <p className='opacity-70 md:opacity-0 group-hover:opacity-100 transition-all select-none bg-black/75 text-white text-[10px] md:text-xs p-1 absolute bottom-0 right-0 rounded-tl-sm'>photo: {p.photo.credit}</p>
              }
            </div>
          : 
            <div className='relative h-62.5 md:h-full w-50 min-w-50 md:w-39 md:min-w-39 mt-4 md:mt-0 border-2 rounded-sm md:rounded-none md:border-0 bg-[#e9e9e9] flex justify-center items-center'>
              <img src={SmallLogo} className='w-1/2 opacity-20' />
            </div>
        }
        <div className='w-[95%] mt-3 md:mt-0 md:w-auto'>
          <p className='font-bold text-lg md:text-xl tracking-wide leading-5 mb-1'>{p.name}</p>
          <div>
            {
              writerDirector
              ? <p className='text-xs md:text-sm -mt-0.5'>a play by <b>{p.writer}</b></p>
              : <div>
                  <p className='text-xs md:text-sm -mt-0.5'>by <b>{p.writer}</b></p>
                  <p className='text-xs md:text-sm -mt-0.5'>directed by <b>{p.director}</b></p>
                </div>
            }
          </div>
          <div className='my-3'>
            {p.roles.map((r) => <p key={r} className='text-sm md:text-md font-bold leading-5'>{r}</p>)}
          </div>
          {
            p.designers?.map((d) => 
              <p key={d.role} className='text-xs'>{d.role} - {d.name}</p>
            )
          }
        </div>
      </div>
      <div className='text-end mt-0.5 md:-mt-1 absolute right-0 top-2.5 md:relative md:top-0 md:h-full'>
        <p className='text-xs md:text-sm'>{p.company && companies[p.company].name} {p.company && p.venue && 'at'} {p.venue && venues[p.venue].name} ({p.year})</p>
      </div>
      {
        hasGallery && 
        <motion.div 
          initial={{scale: 1}}
          whileTap={{scale: 0.9}}
          transition={{duration: 0.1}}
          onClick={() => 
            navigate(`/c/${p.slug}`, {
              state: {
                from: {
                  pathname: filter,
                },
                fromScrollY: window.scrollY
              }
            })
          }
          className='absolute not-md:bottom-4 md:top-10 w-11 h-11 md:w-auto md:h-auto right-2 flex items-center rounded-full md:rounded-sm bg-white border-[#535c68]/70 border-2 not-md:drop-shadow-lg hover:brightness-95 p-2 md:px-3 gap-2 cursor-pointer'
        >
          <p className='not-md:hidden text-[13px] text-[#535c68]'>Gallery</p>
          <Images className='text-[#535c68]' size={is('md') ? 20 : 25} />
        </motion.div>
      }
    </motion.div>
  )
}


function Thumbnail(slug, ext) {
  if(!slug) return null;
  const base = import.meta.env.BASE_URL || '/';

  return `${base}thumbnails/${slug}.${ext? ext : 'jpg'}`
}


function FilterOption({c, category}) {
  return <option key={c} value={c}>{category.name}</option>
}
