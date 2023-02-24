import {Route, Routes, useNavigate} from 'react-router-dom'
import {useEffect} from "react"
import {useRecoilValue} from "recoil"
import {currentUserState} from "../pages/auth/store/useUser"
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/home'
import User from '../pages/user'
import List from '../pages/list'
import Today from '../pages/list/today'
import Quiz from '../pages/quiz'
import Login from "../pages/auth"
import History from '../pages/list/history'
import Form from '../pages/form'

const Router = () => {
  const navigate = useNavigate()
  const isLoggedIn = useRecoilValue(currentUserState)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <Routes>
      {
        isLoggedIn ? (
          <>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/today" element={<Today />}></Route>
              <Route path="/list/:id" element={<List />}></Route>
              <Route path="/quiz" element={<Quiz />}></Route>
              <Route path="/history/:date" element={<History />}></Route>
              <Route path="/new" element={<Form />}></Route>
            </Route>
          </>
        ) : (
          <Route path="/login" element={<Login />}></Route>
        )
      }
    </Routes>
  )
}

export default Router