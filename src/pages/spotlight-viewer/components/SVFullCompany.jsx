

export function SVFullCompany({s}) {

  if(!s) return null;

  const cast = s.cast_and_crew.cast;
  const crew = s.cast_and_crew.crew;
  const thanks = s.cast_and_crew.thanks;

  const colClass = thanks ? 'lg:grid-cols-3 gap-4' : 'lg:grid-cols-2 gap-12';

  return (
    <div className={`grid grid-cols-1 not-md:gap-12 ${colClass} w-full text-sm`}>
      <Column label='Cast' arr={cast} />
      <Column label='Crew' arr={crew} />
      { thanks && 
        <div className='flex flex-col gap-1'>
          <h1 className='text-center uppercase font-bold text-2xl mb-4'>Special Thanks</h1>
          {thanks.map((t) => <p className='text-center'>{t}</p>)}
        </div>
      }
    </div>
  )

}


function Column({label, arr}) {

  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-center uppercase font-bold text-2xl mb-4'>{label}</h1>
      {
        arr.map((x) => {
          return (
            <div className='grid grid-cols-[2fr_1fr_2fr]' >
              <p className='text-end text-[#aaa]'>{x.role}</p>
              <p className='text-center text-[#999]'>-</p>
              <p className='text-start'>{x.name}</p>
            </div>
          )
        })
      }
    </div>
  )

}