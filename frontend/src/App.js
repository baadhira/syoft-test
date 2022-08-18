import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './modules/Home';
import { Login } from './modules/Signin';
import { Signup } from './modules/Signup';

function App() {


  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Login/>}/>


    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;



