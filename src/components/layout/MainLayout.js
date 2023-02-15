import styled from 'styled-components'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Sidebar from '../menu/Sidebar'
import {useState} from 'react'
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
  const [sidebarVisible, setSidebarVisible] = useState(false)

  return (
    <Layout>
      <Header setSidebarVisible={setSidebarVisible}/>
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