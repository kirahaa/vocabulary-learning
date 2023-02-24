import styled from 'styled-components'

const StyledSelect = styled.select`
  padding: 1rem;
  background-color: ${props => props.theme.gray};
  border: none;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  option {
    color: #000;
  }
`

export default StyledSelect