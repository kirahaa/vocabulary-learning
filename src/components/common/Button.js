import styled from 'styled-components'

const StyledButton = styled.button`
  width: ${props => {
    if (props.width) return props.width
    else if (props.icon) return 'fit-content'
    else return "100%"
  }};
  padding: ${props => {
    if (props.size === 'small') return '.8rem .8rem'
    else if (props.size === 'big') return '1.8rem 3rem'
    else return '1.3rem 2.5rem'
  }};
  border-radius: 1rem;
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
  line-height: ${props => {
    if (props.icon) return 0
  }}
}
`

export default StyledButton