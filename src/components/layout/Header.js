import styled from 'styled-components'
import {Menu} from 'react-feather'


const HeaderWrap = styled.header`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 6rem 4rem;
`

const Hamburger = styled.button`
  padding: 1rem;
  background-color: ${props => props.theme.gray};
  color: #fff;
  border-radius: 1.5rem;
  line-height: 0;
`

const Header = ({children}) => {
  return (
    <HeaderWrap>
      <Hamburger>
        <Menu size={30}/>
      </Hamburger>
      {children}
    </HeaderWrap>
  )
}

export default Header