

export function SVHr({secondary=false}) {
  return (
    <div className='my-8 w-full flex justify-center'>
      <hr className={`w-[90%] md:w-4/5 ${secondary ? 'border-[#333]' : 'border-[#e74c3c]'}`} />
    </div>
  )
}