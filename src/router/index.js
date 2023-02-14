import {Route, Routes} from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/home'
import User from '../pages/user'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Route>
    </Routes>
  )
}

export default Router