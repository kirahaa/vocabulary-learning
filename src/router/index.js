import {Route, Routes} from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/home'
import User from '../pages/user'
import List from '../pages/list'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/list/:id" element={<List />}></Route>
      </Route>
    </Routes>
  )
}

export default Router