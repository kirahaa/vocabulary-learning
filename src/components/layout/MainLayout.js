import styled from 'styled-components'
import {Outlet} from 'react-router-dom'

const Layout = styled.div`
  
`

const MainLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default MainLayout