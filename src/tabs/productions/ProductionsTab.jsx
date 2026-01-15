import productions from '../../data/productions.json';
import companies from '../../data/companies.json';
import venues from '../../data/venues.json';
import categories from '../../data/role-categories.json';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTailwindScreen } from '../../components/TailwindScreen';


export function ProductionsTab() {

  const {pathname} = useLocation();
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();
  const { is } = useTailwindScreen();

  useEffect(() => {
    const pathSegs = pathname.split('/').filter(Boolean);
    if(pathSegs.length > 0 && Object.keys(categories).includes(pathSegs[0])) {
      setFilter(pathSegs[0]);
    }
    else if(pathSegs.length > 0 && pathSegs[0] === 'other') setFilter('other');
    else setFilter('');
  }, [pathname])

  let filteredProductions = productions;
  if(filter !== '') {
    if(filter !== 'other') {
      filteredProductions = productions.filter((x) => {
        for(const r of x.roles) {
          if(categories[filter].roles.includes(r)) return true;
        }
        return false;
      });
    }
    else {
      // Other filter: If one of the roles doesn't feature in any category
      filteredProductions = productions.filter((x) => {
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
  }

  const creditCount = filteredProductions.length;
  const oldestYear = filteredProductions[filteredProductions.length-1].year;
  const newestYear = filteredProductions[0].year;

  return (
    <div className='w-full'>

      <div className='w-full flex md:justify-between mb-4'>
        <p className='hidden md:block'>
          {creditCount} productions ({oldestYear} - {newestYear})
        </p>
        <div className='flex gap-2 items-center w-full md:w-auto'>
          <Filter size={18} style={{color: filter==='' ? '#ccc' : '#00b894'}} className='mb-0.5 transition-all' />
          <select value={filter} onChange={(e) => navigate(`/${e.target.value}`, {replace:true})} className='transition-all uppercase border-b-2 focus:outline-0 w-full md:w-auto' style={{borderColor: filter==='' ? '#ddd' : '#00b894'}}>
            <option value=''>All</option>
            { Object.keys(categories).map((c) => <FilterOption c={c} category={categories[c]} />) }
            <option value='other'>Other</option>
          </select>
        </div>
      </div>

      <AnimatePresence initial={false} mode="popLayout">{
        filteredProductions.map((p) => <ProductionItem key={p.slug} p={p} is={is} />)
      }</AnimatePresence>

    </div>
  )

}


function ProductionItem({p, is}) {

  const thumbnail = Thumbnail(p.slug, p.photo?.ext);

  const writerDirector = (p.writer === p.director);

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
        <div className='relative h-62.5 md:h-full w-50 min-w-50 md:w-39 md:min-w-39 mt-4 md:mt-0 overflow-hidden group border-2 rounded-sm md:rounded-none md:border-0'>
          <img 
            src={thumbnail} 
            className='absolute group-hover:saturate-0 group-hover:brightness-90 transition-all w-full h-full object-cover object-center'
          />
          {
            p.photo?.credit && <p className='opacity-100 md:opacity-0 group-hover:opacity-100 transition-all select-none bg-black/75 text-white text-[10px] md:text-xs p-1 absolute bottom-0 right-0 rounded-tl-sm'>photo: {p.photo.credit}</p>
          }
        </div>
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
      <div className='text-end mt-0.5 md:-mt-1 absolute right-0 top-2.5 md:relative md:top-0'>
        <p className='text-xs md:text-sm'>{p.company && companies[p.company].name} {p.company && p.venue && 'at'} {p.venue && venues[p.venue].name} ({p.year})</p>
      </div>
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