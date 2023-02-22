import styled from 'styled-components'
import {CloudDrizzle} from 'react-feather'

const StyledNodata = styled.div`
  padding: 2rem 0;
  text-align: center;
`

const NoData = () => {
  return (
    <StyledNodata>
      <CloudDrizzle />
      <h5>No data</h5>
    </StyledNodata>
  )
}

export default NoData