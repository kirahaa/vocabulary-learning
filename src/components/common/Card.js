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

  h4 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  h5 {
    font-size: 2rem;
    font-weight: 500;
  }
  p {
    padding: 1rem 0;
    font-size: 1.4rem;
    color: ${props => props.theme.text.lightGray};
  }
`

export default StyledCard