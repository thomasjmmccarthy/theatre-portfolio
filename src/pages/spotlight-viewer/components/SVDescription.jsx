

export function SVDescription({s}) {
  return (
    <div className='relative w-full'>
      <p className='text-[#e74c3c] opacity-60 h-0 font-[PaintBrush] absolute text-[100px] -top-5 left-0 -translate-x-2/3'>"</p>
      <p className='text-[#e74c3c] opacity-60 h-0 font-[PaintBrush] absolute text-[100px] bottom-16 right-0 translate-x-2/3'>"</p>
      <p className='text-2xl w-full text-white mt-12 p-4 bg-black/80 rounded-sm tracking-wide'>{s.page.description}</p>
    </div>
  )
}