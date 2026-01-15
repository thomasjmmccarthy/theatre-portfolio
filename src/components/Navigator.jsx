import { useLocation, useNavigate } from "react-router-dom"

export function Navigator() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='w-[90%] max-w-90 border-b-2 flex mb-16'>
      <NavOption label='Productions'  to='/'            active={!(pathname.startsWith('/experience') || pathname.startsWith('/about'))}  navigate={navigate} />
      <NavOption label='Experience'   to='/experience'  active={pathname.startsWith('/experience')}   navigate={navigate} />
      <NavOption label='About'        to='/about'       active={pathname.startsWith('/about')}   navigate={navigate} />
    </div>
  )

}


function NavOption({label, to, active, navigate}) {

  return (
    <div 
      className={`w-full text-center cursor-pointer py-1.5 rounded-t-sm ${!active && 'hover:brightness-95'}`}
      style={
        active
        ? {backgroundColor: '#eee'}
        : {backgroundColor: 'white'}
      }
      onClick={() => {if(!active) navigate(to, {replace:true})}}
    >
      <p className='text-sm lowercase tracking-widest'>{label}</p>
    </div>
  )

}