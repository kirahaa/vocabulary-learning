import styled from "styled-components";

const StyledInput = styled.input`
  width: ${props => props.width ? props.width + "%" : '100%'};
  padding: 1.3rem 2.5rem;
  background: ${props => props.theme.gray};
  border-radius: 3rem;
  font-size: 2rem;
  
  &[type="file"] {
    display: none;
  }
`

export default StyledInput