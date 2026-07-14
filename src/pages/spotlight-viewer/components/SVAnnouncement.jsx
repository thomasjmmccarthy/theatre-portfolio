

export function SVAnnouncement({children}) {
  return (
    <div className='w-full bg-[#e74c3c] p-2 rounded-sm'>
      <p className='text-xl text-black uppercase font-bold text-center tracking-widest leading-6'>
        {children}
      </p>
    </div>
  )
}