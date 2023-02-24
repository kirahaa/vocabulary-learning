import styled from 'styled-components'
import {ChevronLeft, Menu} from 'react-feather'
import {useLocation, useNavigate} from 'react-router-dom'


const HeaderWrap = styled.header`
  display: flex;
  justify-content: ${props => props.notHome ? 'space-between': 'flex-end'};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 6rem 4rem;
`

const Button = styled.button`
  padding: 1rem;
  background-color: ${props => props.theme.gray};
  color: #fff;
  border-radius: 1.5rem;
  line-height: 0;
`

const Header = ({notHome, children, setSidebarVisible}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBackBtn = () => {
    if (location.pathname === '/today') {
      navigate('/')
    } else {
      navigate(-1)
    }
  }

  return (
    <HeaderWrap notHome={notHome}>
      {notHome && (
        <Button onClick={handleBackBtn}>
          <ChevronLeft size={30}/>
        </Button>
      )}

      <Button onClick={() => setSidebarVisible(true)}>
        <Menu size={30}/>
      </Button>
      {children}
    </HeaderWrap>
  )
}

export default Header