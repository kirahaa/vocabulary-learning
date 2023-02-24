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
    width: 140%;
    top: -1.3rem;
    left: -1rem;
    right: 0;
    opacity: 0;
    font-size: 1.5rem;
    transition: .3s all;
  }

  &:hover {
    svg {
      transform: rotate(-90deg);
    }

    &:after {
      top: -1.8rem;
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