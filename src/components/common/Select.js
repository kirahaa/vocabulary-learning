import styled from 'styled-components'

const StyledSelect = styled.select`
  padding: 1.2rem 1.1rem;
  background-color: ${props => props.theme.dark};
  border: 1px solid ${props => props.theme.gray};
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  option {
    color: #fff;
  }
`

export default StyledSelect