import Venues from '../../../data/venues.json';
import Companies from '../../../data/companies.json';

export function SVTitle({s}) {

  const venueOrCompany = s.venue ? Venues[s.venue].name : Companies[s.company].name;

  return (
    <div className='w-full my-8'>
      <p className='uppercase tracking-widest'><span className='opacity-60'>{venueOrCompany} •</span> {s.upcoming ? <span className='text-[#e74c3c] font-bold'>UPCOMING</span> : <span className='opacity-60'>{s.year}</span>}</p>
      <h1 className='uppercase font-bold tracking-[10px] text-3xl md:text-4xl'>{s.name}</h1>
      <p className='opacity-60 uppercase tracking-widest'>by {s.writer}</p>
    </div>
  )

}