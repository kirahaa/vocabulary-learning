import styled from 'styled-components'

const StyledTitle = styled.h1`
  margin: 1rem 0;
  font-weight: bold;
`

const Title = ({children}) => {
  return (
    <StyledTitle>
      {children}
    </StyledTitle>
  )
}

export default Title