import styled from 'styled-components'
import {Plus} from 'react-feather'

const Floating = styled.button`
  position: fixed;
  right: 38%;
  bottom: 3rem;
  padding: 1rem;
  background-color: ${props => props.theme.red};
  border-radius: 50%;
  line-height: 0;

  @media screen and (max-width: 540px) {
    right: 4rem;
    bottom: 7rem;
  }
`

const FloatingMenu = () => {
  return (
    <Floating>
      <Plus size={30}/>
    </Floating>
  )
}

export default FloatingMenu