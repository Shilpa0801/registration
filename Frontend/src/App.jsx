import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLogin from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'


function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserLogin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/home' element={<Home/>}/>
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
