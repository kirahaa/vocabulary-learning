import styled from 'styled-components'

const StyledCard = styled.div`
  width: 100%;
  padding: 3rem 2.5rem;
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 2rem;
  transition: .3s all;
  cursor: ${props => {
    if (props.hover) return 'pointer';
  }};
`

export default StyledCard