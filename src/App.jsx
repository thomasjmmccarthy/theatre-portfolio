import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css'
import { ProductionsTab } from './tabs/productions/ProductionsTab';
import { Navigator } from './components/Navigator';
import { AboutTab } from './tabs/about/AboutTab';
import { ExperienceTab } from './tabs/experience/ExperienceTab';
import { Header } from './components/Header';

function App() {

  return (
    <BrowserRouter>
      <Routes>
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
  return (
    <div className='w-full flex flex-col items-center'>
              
      <Header />

      <div className='w-[90%] max-w-200 flex flex-col items-center'>

        <Navigator />
        
        <Outlet />

        <hr className='w-full mt-6 border opacity-20' />
        <p className='my-3 text-xs opacity-50'>Website designed & developed by Thomas McCarthy</p>

      </div>
    </div>
  )
}