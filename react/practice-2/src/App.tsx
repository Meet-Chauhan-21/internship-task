import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Navigate to="/register"/> }></Route>
        <Route path='/home' element={ <Home/> }></Route>
        <Route path='/register' element={ <Register/> }></Route>
      </Routes>
    </>
  )
}

export default App
