import styled from 'styled-components'

const StyledButton = styled.button`
  width: ${props => {
    if (props.width) return props.width
    else return "100%"
  }};
  padding: .8rem 2rem;
  border-radius: .5rem;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: ${props => {
    if (props.bgColor) return props.theme[props.bgColor]
  }};
  color: ${props => {
    if (props.bgColor !== 'white') return '#fff'
    else return '#000'
  }};
  opacity: ${(props) => {
    if (props.disabled) return .3
    else return 1
  }};
`

export default StyledButton