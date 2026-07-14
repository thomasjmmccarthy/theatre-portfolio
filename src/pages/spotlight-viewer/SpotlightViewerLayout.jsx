import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Productions from '../../data/productions.json';
import Spotlight from '../../data/spotlight.json';
import Venues from '../../data/venues.json';
import Companies from '../../data/companies.json';
import { useTailwindScreen } from "../../components/TailwindScreen";
import { ArrowLeftToLine, X } from "lucide-react";


export function SpotlightViewerLayout() {

  const { is } = useTailwindScreen();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  }

  return (
    <div className='relative z-0 w-full min-h-dvh bg-black flex flex-col items-center text-white'>

      {
        is('md') 
        ? <div 
            onClick={handleBack}
            className='group fixed top-4 left-3 text-[#ccc] hover:text-white flex items-center gap-2'
          >
            <ArrowLeftToLine className='bg-black p-2 w-10 h-10 rounded-full transition-all cursor-pointer border-2 border-black hover:border-[#ccc]' size={20} />
            <p className='opacity-0 group-hover:opacity-100 transition-all text-sm select-none'>
              Spotlight
            </p>
          </div>
        : <X onClick={handleBack} size={24} className='absolute top-6 right-6 text-[#999] hover:text-[#555] cursor-pointer' />  
      }

      <Outlet />
    </div>
  )
}