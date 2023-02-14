import styled from 'styled-components'
import {Outlet} from 'react-router-dom'
import Header from './Header'

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
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  )
}

export default MainLayout