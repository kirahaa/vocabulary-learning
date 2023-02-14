import styled from 'styled-components'

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  gap: ${props => {
    if (props.gap) return props.gap + 'rem'
    else return 0
  }}
`

export default FlexBox