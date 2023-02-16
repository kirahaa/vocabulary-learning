import Row from '../../../components/common/Row'
import FlexBox from '../../../components/common/FlexBox'
import {useRecoilValue} from 'recoil'
import WordItem from '../WordItem'
import {randomWordListState} from '../store/useWord'
import Title from '../../../components/common/Title'
import StyledButton from '../../../components/common/Button'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

const Button = styled(StyledButton)`
  font-size: 2rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.text.gray};
`


const Today = () => {
  const navigate = useNavigate()
  const {randomTodayList} = useRecoilValue(randomWordListState)
  const [enBtn, setEnBtn] = useState(false)
  const [koBtn, setKoBtn] = useState(false)
  const [wordType, setWordType] = useState(null)

  const handleToggle = (type) => {
    if (type === "en") {
      setEnBtn(!enBtn)
      setWordType("en")
    } else if (type === "ko"){
      setKoBtn(!koBtn)
      setWordType("ko")
    }
  }

  useEffect(() => {
    if (enBtn && koBtn) {
      if (wordType === "en") {
        setKoBtn(false)
      } else if (wordType === "ko") {
        setEnBtn(false)
      }
    } else if (!enBtn && !koBtn) {
      setWordType(null)
    }
  }, [enBtn, koBtn, wordType])

  return (
    <>
      <Title>Today's words</Title>
      <Row>
        <FlexBox justify="flex-end">
          <ButtonGroup>
            <ToggleButton active={enBtn} onClick={() => handleToggle("en")}>En</ToggleButton>
            <ToggleButton active={koBtn} onClick={() => handleToggle("ko")}>Ko</ToggleButton>
          </ButtonGroup>
        </FlexBox>
      </Row>
      <FlexBox direction="column" gap="2">
        {
          randomTodayList.map(word => (
            <WordItem key={`${word.en}-today`} word={word} type={wordType}/>
          ))
        }
      </FlexBox>
      <Row>
        <Button bgColor="primary" onClick={() => navigate('/quiz')}>Let's take a quiz!</Button>
      </Row>
    </>
  )
}

export default Today