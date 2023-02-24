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
`

const MainLayout = () => {
  const location = useLocation()
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const [notHome, setNotHome] = useState(false)

  useEffect(() => {
    if (location.pathname !== "/") {
      setNotHome(true)
    } else {
      setNotHome(false)
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
      <FloatingMenu />
      <Footer />
    </Layout>
  )
}

export default MainLayout