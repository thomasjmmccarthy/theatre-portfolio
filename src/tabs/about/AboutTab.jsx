import Headshot from '../../assets/headshot/headshot.jpeg';

export function AboutTab() {
  return (
    <div className='w-full flex flex-col items-center gap-8 md:items-start md:flex-row md:justify-between'>
      <div className='space-y-4 text-sm'>
        <p>
          Thomas 'Tommo' McCarthy is a freelance theatre maker based in Kent and London, specialising
          in <b>lighting design and technical theatre.</b> His work has featured in productions across Kent, London and York.
        </p>
        <p>
          Thomas has been involved in creative development programmes including <b>the Old Vic Theatre Makers 
          (2024/25)</b>, and is a <b>BFI Film Academy (2020/21) alumnus</b>, with a Silver Arts Award from Trinity College, London. In addition, he is 
          a founding member and current <b>Creative Director of The Dark Slate Theatre Company</b>, which focuses on developing immersive productions.
        </p>
        <p>
          Outside his lighting and technical work, Tommo enjoys writing his own plays, directing for theatre and film, reading John le Carré novels,
          and making websites (including this one). He is currently trying to learn guitar, with debatable success.
        </p>
      </div>
      <div className='w-[60%] md:min-w-[25%] md:mr-2'>
        <img src={Headshot} className='w-full rounded-md' />
        <p className='text-xs text-[#555]'>Photo by Medina Makaeva</p>
      </div>
    </div>
  )
}