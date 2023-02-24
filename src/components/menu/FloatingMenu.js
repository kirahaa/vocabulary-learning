import styled from 'styled-components'
import {Plus} from 'react-feather'
import {useNavigate} from 'react-router-dom'

const Floating = styled.button`
  position: fixed;
  right: 38%;
  bottom: 3rem;
  padding: 1rem;
  background-color: ${props => props.theme.red};
  border-radius: 50%;
  line-height: 0;
  z-index: 100;

  @media screen and (max-width: 540px) {
    right: 4rem;
    bottom: 7rem;
  }
`

const FloatingMenu = () => {
  const navigate = useNavigate()

  return (
    <Floating onClick={() => navigate('/new')}>
      <Plus size={30}/>
    </Floating>
  )
}

export default FloatingMenu