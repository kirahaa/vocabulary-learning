import styled from 'styled-components'
import {CloudDrizzle} from 'react-feather'

const StyledNodata = styled.div`
  padding: ${props => props.size === "big" ? "15rem" : "2rem"} 0;
  text-align: center;
  h5 {
    padding: 1rem 0;
    font-size: 1.6rem;
  }
`

const NoData = ({size}) => {
  return (
    <StyledNodata size={size}>
      <CloudDrizzle size={30}/>
      <h5>No data</h5>
    </StyledNodata>
  )
}

export default NoData