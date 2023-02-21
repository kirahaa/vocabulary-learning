import styled from 'styled-components'

const ButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.text.gray};
`

const ToggleButton = styled.button`
  position: relative;
  padding: 0 .8rem;
  font-size: 1.7rem;
  color: ${props => props.active ? props.theme.white : null};

  &:before {
    content: "";
    position: absolute;
    top: .9rem;
    left: -.5rem;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background-color: ${props => props.active ? props.theme.white : props.theme.gray};
  }
`

const ButtonGroup = ({enBtn, koBtn, handleToggle}) => {
  return (
    <ButtonWrap>
      <ToggleButton active={enBtn} onClick={() => handleToggle("en")}>En</ToggleButton>
      <ToggleButton active={koBtn} onClick={() => handleToggle("ko")}>Ko</ToggleButton>
    </ButtonWrap>
  )
}

export default ButtonGroup