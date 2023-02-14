import {Route, Routes} from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/home'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<Home />}></Route>
      </Route>
    </Routes>
  )
}

export default Router