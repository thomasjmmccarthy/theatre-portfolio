import { useNavigate } from 'react-router-dom';
import experience from '../../data/experience.json';

export function ExperienceTab() {

  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <p className='mb-6 text-center'>
        Experience includes <b>contract work, creative development, and relevant training</b> outside 
        of production credits.<br/>
        A full list of productions can be found in the <span className='underline cursor-pointer' onClick={() => navigate('/', {replace:true})}>Productions</span> tab.
      </p>
      {
        experience.map((x, i) => <ExperienceItem key={i} x={x} />)
      }
    </div>
  )

}


function ExperienceItem({x}) {

  return (
    <div className='px-2 py-4 border-t-2 flex items-start justify-between overflow-hidden'>
      <div>
        <p className='font-bold text-lg tracking-wide'>{x.company}</p>
        <div className='my-3'>
          {x.roles.map((r) => <p key={r} className='leading-5'>{r}</p>)}
        </div>
        <p className='text-sm text-[#555] mt-4'>Responsibilities</p>
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
      <div className='text-end mt-0.5 min-w-35'>
        <p className='text-sm hidden md:block'>{getFormattedDate(x.start, x.end)}</p>
        <p className='block md:hidden'>{getFormattedDate(x.start, x.end, true)}</p>
      </div>
    </div>
  )

}


function getFormattedDate(start, end, yearOnly=false) {

  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
  let startStr;
  let endStr;

  if(!end) endStr = 'present'
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