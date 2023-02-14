import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledSidebar = styled.nav`
  position: absolute;
  top: 0;
  left: ${props => {
    if (props.active) return 0
    else return '100%';
  }};
  width: 100%;
  height: 100%;
  padding: 6rem;
  background-color: ${props => props.theme.bgColors.dark};
  transition: .3s all;
  z-index: 1000;
`

const Item = styled.li`
  padding-bottom: 5rem;
  font-size: 3rem;
`

const Sidebar = ({sidebarVisible, setSidebarVisible}) => {
  return (
    <StyledSidebar active={sidebarVisible} onClick={() => setSidebarVisible(!sidebarVisible)}>
      <ul>
        <Item><Link to="/home">HOME</Link></Item>
        <Item><Link to="/user">MY PAGE</Link></Item>
      </ul>
    </StyledSidebar>
  )
}

export default Sidebar