
import  { Routes, Route, useLocation } from 'react-router-dom';

import { Home, Form, Detail, Landing, NavBar } from './views';

import { FormPlatforms, FormGenre, Error404 } from './components/index';

import style from './App.module.css'

function App() {
  const {pathname} = useLocation();

  return (
    <div className={style.App}>
     
    {pathname !== '/' ? <NavBar/> : null} 

       <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/videoGames/:id' element={<Detail/>} />
        <Route path='/create' element={<Form/>} />
        <Route path='/platform' element={<FormPlatforms/>}/>
        <Route path='/genre' element={<FormGenre/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
     
     
      
    </div>
  );
}

export default App;
