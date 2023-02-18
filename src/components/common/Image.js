import styled from 'styled-components'

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  border-radius: ${(props) => props.radius ? '50%' : 0};
  object-fit: cover;
};
`

export const Image = styled.img`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
  height: auto;
`

export default StyledImage