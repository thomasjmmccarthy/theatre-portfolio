import { useTailwindScreen } from "../../../components/TailwindScreen";
import { SVTextSection } from "./SVTextSection";


export function SVImageSection({children, label, src, credit=null, caption=null, left=false}) {

  const { is } = useTailwindScreen();
  const order = left ? [1, 2] : [2, 1];

  console.log(left, ':', order);

  return (
    <div className='w-full flex items-center not-md:flex-col md:gap-8'>
      <div className='w-full md:w-[40%] md:mb-6' style={{order: is('md') ? order[0] : 1}}>
        {
          !is('md') && 
          <h1 className='text-xl tracking-widest font-bold mb-3 mt-4 uppercase text-[#eee]'>{label}</h1>
        }
        <div className='w-full aspect-4/3 overflow-hidden'>
          <img className='w-full h-full object-cover' src={src} />
        </div>
        {
          (caption || credit) && 
          <p className='text-xs text-[#555] mt-1'>{caption ? `${caption}${credit ? ', ' : ''}` : ''}{credit ? `photo: ${credit}` : ''}</p>
        }
      </div>
      <div style={{order: is('md') ? order[1] : 2}} className='w-full md:w-[60%]'>
        {
          is('md') && 
          <h1 className='text-xl tracking-widest font-bold -mb-6'>{label}</h1>
        }
        <SVTextSection>
          {children}
        </SVTextSection>
      </div>
    </div>
  )

}