import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import { motion } from 'motion/react';

import { ProductionsTab } from './tabs/productions/ProductionsTab';
import { Navigator } from './components/Navigator';
import { AboutTab } from './tabs/about/AboutTab';
import { ExperienceTab } from './tabs/experience/ExperienceTab';
import { Header } from './components/Header';
import { GalleryViewer } from './tabs/productions/gallery-viewer/GalleryViewer';
import { SpotlightPage } from './pages/spotlight/SpotlightPage';
import { useState } from 'react';
import { SpotlightViewerLayout } from './pages/spotlight-viewer/SpotlightViewerLayout';
import { BlackMountainSpotlight } from './spotlight-pages/black-mountain/BlackMountainSpotlight';
import { GreatGatsbySpotlight } from './spotlight-pages/great-gatsby/GreatGatsbySpotlight';
import { MirrorCircleSpotlight } from './spotlight-pages/mirror-circle/MirrorCircleSpotlight';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/'                element={<SpotlightPage />} />
        <Route path='/c/*'             element={<GalleryViewer />} />


        <Route element={<SpotlightViewerLayout />} >
          
          <Route path='/s/black-mountain' element={<BlackMountainSpotlight />} />
          <Route path='/s/great-gatsby'   element={<GreatGatsbySpotlight />} />
          <Route path='/s/mirror-circle'  element={<MirrorCircleSpotlight />} />

        </Route>


        <Route element={<AppLayout />} >

          <Route path='/about'           element={<AboutTab />} />
          <Route path='/experience'      element={<ExperienceTab />} />
          <Route path='/*'               element={<ProductionsTab />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App



function AppLayout() {

  const [exitingPortfolio, setExitingPortfolio] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    setExitingPortfolio(true);
    setTimeout(() => {
      navigate('/');
    }, 500)
  }

  return (
    <div className='w-full flex flex-col items-center'>
              
      <Header handleExit={handleExit} />

      {
        exitingPortfolio && 
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.25}} className='fixed inset-0 z-100 bg-black' />
      }

      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.25}} className='w-[90%] max-w-200 flex flex-col items-center'>

        <Navigator />
        
        <Outlet />

        <hr className='w-full mt-6 border opacity-20' />
        <p className='my-3 text-xs opacity-50'>Website designed & developed by Thomas McCarthy</p>

      </motion.div>
    </div>
  )
}