

export function SVTextSection({children}) {

  return (
    <div className='w-full py-8'>
      <p className='text-[#ccc] text-lg [&>i]:text-white [&>b]:text-[#e74c3c] [&>b]:font-normal'>
        {children}
      </p>
    </div>
  )

}