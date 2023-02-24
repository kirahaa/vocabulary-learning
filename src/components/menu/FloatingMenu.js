import styled from 'styled-components'
import {Plus} from 'react-feather'
import {useNavigate} from 'react-router-dom'

const Floating = styled.button`
  display: ${props => props.isNewPage ? "none" : "block"};
  position: fixed;
  right: 38%;
  bottom: 3rem;
  padding: 1rem;
  background-color: ${props => props.theme.red};
  border-radius: 50%;
  line-height: 0;
  z-index: 100;
  transition: .3s all;

  &:after {
    content: "Add word!";
    position: absolute;
    display: block;
    width: 124%;
    top: -1.5rem;
    left: -0.5rem;
    right: 0;
    opacity: 0;
    transition: .3s all;
  }

  &:hover {
    svg {
      transform: rotate(-90deg);
    }

    &:after {
      opacity: 1;
    }
  }
  
  svg {
    transition: .3s all;
  }

  @media screen and (max-width: 540px) {
    right: 4rem;
    bottom: 7rem;
  }
`

const FloatingMenu = ({isNewPage}) => {
  const navigate = useNavigate()

  return (
    <Floating isNewPage={isNewPage} onClick={() => navigate('/new')}>
      <Plus size={30}/>
    </Floating>
  )
}

export default FloatingMenu