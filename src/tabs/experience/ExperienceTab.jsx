import { useNavigate } from 'react-router-dom';
import experience from '../../data/experience.json';
import { Hammer, Hand, LandPlot, NotepadText } from 'lucide-react';
import { useTailwindScreen } from '../../components/TailwindScreen';

export function ExperienceTab() {

  const navigate = useNavigate();
  const { is } = useTailwindScreen();

  return (
    <div className='w-full'>
      <p className='mb-6 text-center'>
        Experience includes <b>contract work, creative development, and relevant training</b> outside 
        of production credits.<br/>
        A full list of productions can be found in the <span className='underline cursor-pointer' onClick={() => navigate('/', {replace:true})}>Productions</span> tab.
      </p>
      <p className='text-end text-xs italic text-[#555] mb-1 pt-1'>Ordered by most recent ending date.</p>
      {
        experience.map((x, i) => <ExperienceItem key={i} x={x} is={is} />)
      }
    </div>
  )

}


function ExperienceItem({x, is}) {

  return (
    <div className='px-2 py-4 border-t-2 flex items-start justify-between overflow-hidden'>
      <div>
        <p className='font-bold text-lg tracking-wide leading-5 mb-4'>{x.company}</p>
        <div className='my-3'>
          {x.roles.map((r) => <p key={r} className='leading-5'>{r}</p>)}
        </div>
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
      <div className='flex flex-col items-end mt-0.5 min-w-20 md:min-w-40'>
        <p className='text-sm hidden md:block'>{getFormattedDate(x.start, x.end, is)}</p>
        <p className='block md:hidden'>{getFormattedDate(x.start, x.end, is, true)}</p>
        <ExperienceBadge type={x.type} />
      </div>
    </div>
  )

}


function getFormattedDate(start, end, is, yearOnly=false) {

  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
  let startStr;
  let endStr;

  if(!end) endStr = is('md') ? 'present' : '';
  else {
    const endSegs = end.split('-');
    if(yearOnly) endStr = endSegs[1];
    else endStr = `${months[parseInt(endSegs[0]) - 1]} ${endSegs[1]}`;
  }

  const startSegs = start.split('-');
  if(yearOnly) startStr = startSegs[1];
  else startStr = `${months[parseInt(startSegs[0]) - 1]} ${startSegs[1]}`;

  if(startStr === endStr) return startStr;
  else return `${startStr} - ${endStr}`;
}


function ExperienceBadge({type}) {

  const SIZE = 16;

  let text;
  let colour;
  let icon;

  if(!type) return null;

  if(type === 'contract') {
    text = 'Contract Work';
    colour = '#55efc4';
    icon = <NotepadText size={SIZE} />
  }
  else if(type === 'appointment') {
    text = 'Voluntary Role';
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
      className='flex items-center text-xs font-bold uppercase gap-2 mt-2 px-2 py-1 rounded-full h-8 md:h-auto'
    >
      <p className='hidden md:block'>{text}</p> {icon}
    </div>
  )

}