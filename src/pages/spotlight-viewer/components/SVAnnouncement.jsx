

export function SVAnnouncement({label=null, href=null, children}) {
  return (
    <div className='w-full bg-[#e74c3c] p-2 px-4 rounded-sm flex not-md:flex-col items-center justify-center md:gap-8 gap-2'>
      <p className={`lg:text-xl text-black uppercase font-bold tracking-widest leading-6 ${(label && href) ? 'text-start' : 'text-center'}`}>
        {children}
      </p>
      {
        (label && href)
        ? <div className='shrink-0 flex justify-center'>
            <a href={href} target='_blank' className='border border-black text-black uppercase tracking-wide px-3 py-1 my-1 opacity-60 bg-transparent hover:opacity-100 hover:bg-black/10 transition-all font-bold'>{label}</a>
          </div>
        : null
      }
    </div>
  )
}