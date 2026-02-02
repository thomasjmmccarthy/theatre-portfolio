import { getGallery } from "./getGallery";
import productions from '../../../data/productions.json';
import companies from '../../../data/companies.json';
import venues from '../../../data/venues.json';
import { useEffect, useMemo, useState } from "react";
import { buildRows } from "./buildRows";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useTailwindScreen } from "../../../components/TailwindScreen";
import { Loader } from "../../../components/Loader";

export function GalleryViewer() {


  const [p, setP] = useState(null);

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const images = useMemo(() => getGallery(p?.slug), [p?.slug]);
  const rows = useMemo(() => buildRows(images), [images]);

  // Get production from path ending
  useEffect(() => {
    const pathSegs = pathname.split('/').filter(Boolean);
    const pathEnd = pathSegs.length > 1 ? pathSegs[1] : null;
    if(pathEnd) {
      let production;
      productions.forEach((p) => {
        if(p.slug === pathEnd) {
          production = p;
        }
      });
      if(production) setP(production);
      else navigate('/');
    }
    else navigate('/');
  }, [pathname]);

  const writerDirector = p && (p.writer === p.director);

  if(!p) return null;

  return (
    <div className='bg-white flex not-md:flex-col gap-6 z-100 not-md:overflow-y-auto'>
      
      {/* Sidebar */}
      <div className='w-full md:h-[dvh] md:w-[20%] md:min-w-115 mt-12 md:mt-22'>
        <div className='md:fixed md:w-[20%] md:min-w-115 px-7 md:px-15 w-full'>
          <p className='text-[#999] text-[15px] tracking-widest mb-4 md:mb-6'>{p.year} — <b>{p.roles.map((r,i) => (i!==p.roles.length-1 ? `${r}, ` : r))}</b></p>
          <h1 className='font-bold text-3xl tracking-wide'>{p.name}</h1>
          <div className='mt-6 md:mt-8'>
          {
            writerDirector
            ? <p className='text-sm'>A play by <b>{p.writer}</b></p>
            : <div className='text-sm'>
                <p>By <b>{p.writer}</b></p>
                <p>Directed by <b>{p.director}</b></p>
              </div>
          }
          </div>
          <div className='text-sm mt-8 md:mt-10'>
            {
              p.designers?.map((d) => 
                <p key={d.role}><b>{d.role}</b> - {d.name}</p>
              )
            }
          </div>
          {
            p.cast && 
            <p className='text-sm mt-8 md:mt-10'><b>Cast</b> - { p.cast.map((c, i) => (i!==p.cast.length-1) ? `${c}, ` : c) }</p>
          }
            
          <p className='text-[#555] text-xs mt-8 md:mt-10'>
            {p.company ? `Presented by ${companies[p.company].name}` : p.venue ? 'Performed' : ''} {p.venue ? `at ${venues[p.venue].name}` : ''}
          </p>
          {
            p.photo && 
            <p className='text-[#555] text-xs'>
              Photos by { p.photo.gallery 
              ? <b>{p.photo.gallery.map((g, i) => (i!==p.photo.gallery.length-1 ? `${g}, ` : g))}</b>
              : <b>{p.photo.credit}</b>
              }
            </p>
          }
        </div>
      </div>

      {/* Gallery */}
      {
        !rows.length 
        ? 
          <div className='w-full flex flex-col gap-6 justify-center items-center not-md:mt-20 md:h-dvh'>
            <Loader />
            <p className='text-[#555] text-sm'>Preparing Gallery...</p>
          </div>
        :
          <div className='w-full mt-5 md:mt-10 flex justify-center'>
            <div className='w-full md:overflow-y-auto flex flex-col pb-6 not-md:px-3 md:pt-5 md:pb-15 md:pr-15'>
              {
                rows.map((row, idx) => 
                  <Row 
                    key={`${row.type}-${idx}`} 
                    row={row} 
                    idx={idx} 
                    isLast={idx === rows.length-1} 
                  />
                )
              }
            </div>
          </div>
      }
    </div>
  )

}



function Row({ row, idx, isLast }) {

  const { is } = useTailwindScreen();

  const gap = (
    is('lg') ? 6
    : is('md') ? 4
    : is('sm') ? 2
    : 1
  )

  const gapMap = {
    1: "gap-1 mb-1",
    2: "gap-2 mb-2",
    4: "gap-4 mb-4",
    6: "gap-6 mb-6",
  };

  const gapClass = isLast
    ? gapMap[gap].replace(/mb-\d+/, "mb-0")
    : gapMap[gap];
  
  const imgClass = 'object-cover w-full h-full';

  // LLL is a special row type, as the second and third images are presented as a column
  if(row.type === 'LLL') {
    const [a, b, c] = row.items;
    return (
      <RowContainer idx={idx} className={`grid grid-cols-[2fr_1fr] ${gapClass}`}>
        <LazyImage src={a.src} className={imgClass} />

        <div className={`grid grid-rows-2 ${gapClass} h-full w-full`}>
          <LazyImage src={b.src} className={imgClass} />
          <LazyImage src={c.src} className={imgClass} />
        </div>
      </RowContainer>
    )
  }

  const templateCols = {
    LL:   'grid-cols-2',
    LP:   'grid-cols-[2fr_1fr]',
    PL:   'grid-cols-[1fr_2fr]',
    PP:   'grid-cols-2',
    LPP:  'grid-cols-[2fr_1fr_1fr]',
    PLP:  'grid-cols-[1fr_2fr_1fr]',
    PPL:  'grid-cols-[1fr_1fr_2fr]',
    PPP:  'grid-cols-3'
  }

  if(templateCols[row.type]) {
    return (
      <RowContainer idx={idx} className={`w-full grid ${templateCols[row.type]} ${gapClass}`}>
        {row.items.map((i) => (
          <LazyImage src={i.src} className={imgClass} />
        ))}
      </RowContainer>
    )
  }

  // Single landscape
  if(row.type === 'L') {
    const i = row.items[0];
    return (
      <RowContainer idx={idx} className={`w-full ${gapClass}`}>
        <div className='aspect-2/1'>
          <LazyImage src={i.src} className={imgClass} />
        </div>
      </RowContainer>
    )
  }

  if(row.type === 'P') {
    const i = row.items[0];
    return (
      <RowContainer idx={idx} className={`w-1/2 ${gapClass}`}>
        <div className='aspect-3/4'>
          <LazyImage src={i.src} className={imgClass} />
        </div>
      </RowContainer>
    )
  }

  return null;

}


function RowContainer({className, idx, children}) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.7, delay: 0.2 + (0.3*idx), ease: [0.22, 1, 0.36, 1]}}
      className={className}
    >
      {children}
    </motion.div>
  )
}


function LazyImage({ src, alt='', className='' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='relative w-full h-full overflow-hidden'>
      {!loaded && (
        <div className='absolute inset-0 animate-pulse bg-neutral-200' />
      )}

      <img 
        src={src}
        alt={alt}
        loading='lazy'
        decoding='async'
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}