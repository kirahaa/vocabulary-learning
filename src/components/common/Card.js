import styled from 'styled-components'
import {colorChip} from '../../utility/theme'
import {wordLevels} from '../../database/words'

const StyledCard = styled.div`
  width: 100%;
  padding: 3rem 2.5rem;
  background-color: ${(props) => props.theme[props.bgColor]};
  border: 1px solid ${props => {
    if (props.border) {
      switch (props.border) {
        case wordLevels.basic:
          return colorChip.sky
        case wordLevels.intermediate:
          return colorChip.secondary
        case wordLevels.advanced:
          return colorChip.purple
        default:
          return colorChip.gray
      }
    }
    else return 'transparent'
  }};
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