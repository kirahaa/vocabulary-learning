import styled, {css} from 'styled-components'

const ErrorMsg = styled.p`
  padding: 1rem 2rem 0;
  color: ${props => props.theme.red};
  ${props => props.file && css`
    padding: 1rem 0;
  `}  
`

export default ErrorMsg