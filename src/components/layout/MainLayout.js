import styled from 'styled-components'
import {Outlet, useLocation} from 'react-router-dom'
import Header from './Header'
import Sidebar from '../menu/Sidebar'
import {useEffect, useState} from 'react'
import Footer from './Footer'
import FloatingMenu from '../menu/FloatingMenu'

const Layout = styled.div`
  position: relative;
  max-width: 540px;
  margin: 0 auto;
  font-size: 1.6rem;
  padding: 17rem 6rem 0;
  border-radius: 5rem;
  overflow: hidden;
  background: ${props => props.theme.bgColors.dark};

  @media screen and (max-width: 540px) {
    padding: 15rem 4rem 0;
  }
`

const MainLayout = () => {
  const location = useLocation()
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const [notHome, setNotHome] = useState(false)
  const [isNewPage, setIsNewPage] = useState(false)

  useEffect(() => {
    if (location.pathname === "/") {
      setNotHome(false)
      setIsNewPage(false)
    } else {
      setNotHome(true)
      if (location.pathname === "/new") {
        setIsNewPage(true)
      } else {
        setIsNewPage(false)
      }
    }
  }, [location])

  return (
    <Layout>
      <Header
        notHome={notHome}
        setSidebarVisible={setSidebarVisible}/>
      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible} />
      <Outlet />
      <FloatingMenu isNewPage={isNewPage} />
      <Footer />
    </Layout>
  )
}

export default MainLayout