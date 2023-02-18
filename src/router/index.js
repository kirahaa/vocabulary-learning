import {Route, Routes} from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/home'
import User from '../pages/user'
import List from '../pages/list'
import Today from '../pages/list/today'
import Quiz from '../pages/quiz'
import Login from "../pages/auth"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/today" element={<Today />}></Route>
        <Route path="/list/:id" element={<List />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  )
}

export default Router