import { useNavigate } from 'react-router-dom';
import experience from '../../data/experience.json';
import { Building2, FileText, Hammer, Hand, LandPlot, NotepadText, PanelTopClose, PanelTopOpen, Rows3, Rows4 } from 'lucide-react';
import { useTailwindScreen } from '../../components/TailwindScreen';
import { useState } from 'react';

export function ExperienceTab() {

  const navigate = useNavigate();
  const { is } = useTailwindScreen();

  const upcoming = experience.filter(x => x.upcoming);
  const current = experience.filter(x => x.end === null && !x.upcoming);
  const former = experience.filter(x => x.end !== null);

  return (
    <div className='w-full'>
      <p className='text-center mb-16'>
        Experience includes <b>contract work, creative development, and relevant training</b> outside 
        of productions.<br/>
        A full list of productions can be found in the <span className='underline cursor-pointer' onClick={() => navigate('/credits')}>Credits</span> tab.
      </p>
      {
        upcoming.length
        ? 
          <>
            <SectionHeader label='Upcoming' />
            {
              upcoming.map((x, i) => <ExperienceItem key={i} x={x} is={is} />)
            }
          </>
        : <div/>
      }
      {
        current.length 
        ?
          <>
            <SectionHeader label='Current' />
            {
              current.map((x, i) => <ExperienceItem key={i} x={x} is={is} />)
            }
          </>
        : <div />
      }
      {
        former.length
        ?
          <> 
            <SectionHeader label='Former' />
            <p className='-mt-6.5 text-end text-xs italic text-[#555] mb-1.5 pt-1 not-md:pr-2'>Ordered by most recent ending date.</p>
            {
              former.map((x, i) => <ExperienceItem key={i} x={x} is={is} />)
            }
          </>
        : <div />
      }
    </div>
  )

}


function SectionHeader({label}) {
  return <h1 className='mt-12 font-bold uppercase md:text-[#aaa] text-xl not-md:bg-[#f5f5f5] not-md:px-1 not-md:border-t-2 border-black'>{label}</h1>
}


function ExperienceItem({x, is}) {

  return (
    <>
      <div className='px-2 pt-4 border-t-2 flex items-start justify-between overflow-hidden'>
        <div className='w-full flex items-center gap-4'>
          <ExperienceBadge type={x.type} collapsed={true} />
          <div>
            <p className='font-bold md:text-lg line-clamp-1 tracking-wide leading-5'>{x.company}</p>
            <p className='text-sm'>
              {x.roles.map((r, i) => {
                if(i === x.roles.length-1) return r
                return `${r}, `
              })}
            </p>
          </div>
        </div>
        <div className='min-w-30 h-full flex justify-end items-center'>
          <p className='text-sm hidden md:block'>{getFormattedDate(x.start, x.end, is, x.upcoming)}</p>
          <p className='text-sm block md:hidden'>{getFormattedDate(x.start, x.end, is, x.upcoming, true)}</p>
        </div>
      </div>
      {
        !x.upcoming
        ? 
          <div className='ml-4 pb-8'>
            {!x.override_responsibilities && <p className='text-sm text-[#555] mt-4'>Responsibilities</p>}
            <ul className='list-disc pl-8'>
              {x.responsibilities.map((r) => 
                <li key={r} className='text-sm text-[#555] leading-5'>{r}</li>
              )}
            </ul>
            {
              x.activities && 
              <div className='mt-4'>
                <p className='text-sm text-[#555]'>Notable Activity</p>
                <ul className='list-disc pl-8'>
                  {x.activities.map((a) => 
                    <li key={a} className='text-sm text-[#555] leading-5'>{a}</li>
                  )}
                </ul>
              </div>
            }
          </div>
        : <div className='pb-4' />
      }
    </>
  )

}


function getFormattedDate(start, end, is, upcoming, yearOnly=false) {

  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
  let startStr;
  let endStr;

  if(end) {
    const endSegs = end.split('-');
    if(yearOnly) endStr = endSegs[1];
    else endStr = `${months[parseInt(endSegs[0]) - 1]} ${endSegs[1]}`;
  }

  const startSegs = start.split('-');
  if(yearOnly) startStr = startSegs[1];
  else startStr = `${months[parseInt(startSegs[0]) - 1]} ${startSegs[1]}`;

  if(startStr === endStr || upcoming) return startStr;
  else if(!end) return `Since ${startStr}`;
  else return `${startStr} - ${endStr}`;
}


function ExperienceBadge({type}) {

  const SIZE = 16;

  let text;
  let colour;
  let icon;

  if(!type) return null;

  if(type === 'employment') {
    text = 'Employment',
    colour = '#fd79a8',
    icon = <Building2 size={SIZE} />
  }
  else if(type === 'contract') {
    text = 'Freelance';
    colour = '#55efc4';
    icon = <NotepadText size={SIZE} />
  }
  else if(type === 'appointment') {
    text = 'Voluntary';
    colour = '#a29bfe';
    icon = <Hand size={SIZE} />
  }
  else if(type === 'development') {
    text = 'Creative Development';
    colour = '#ff7675';
    icon = <LandPlot size={SIZE} />
  }
  else if(type === 'training') {
    text = 'Training';
    colour = '#fdcb6e';
    icon = <Hammer size={SIZE} />
  }

  return (
    <div 
      style={{backgroundColor: colour}}
      className='relative group flex items-center text-xs font-bold uppercase gap-2 px-2 py-1 rounded-full h-8 md:hover:max-w-100 max-w-8 transition-all duration-500 ease-in-out overflow-hidden'
    >
      <div>{icon}</div>
      <p className='text-nowrap pr-1'>{text}</p>
    </div>
  )

}