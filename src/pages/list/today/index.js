import Row from '../../../components/common/Row'
import FlexBox from '../../../components/common/FlexBox'
import WordItem from '../WordItem'
import useWord from '../store/useWord'
import Title from '../../../components/common/Title'
import StyledButton from '../../../components/button/Button'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import ButtonGroup from '../../../components/button/ButtonGroup'
import {wordType} from '../../../database/words'

const Button = styled(StyledButton)`
  font-size: 2rem;
`

const Today = () => {
  // ** hooks
  const navigate = useNavigate()
  const {todayList} = useWord()

  // ** states
  const [enBtn, setEnBtn] = useState(true) // 기본 모드
  const [koBtn, setKoBtn] = useState(false)
  const [currentWordType, setCurrentWordType] = useState(wordType.type1)

  const handleToggle = (type) => {
    if (type === wordType.type1) {
      setEnBtn(!enBtn)
      setKoBtn(false)
      setCurrentWordType(type)
    } else if (type === wordType.type2){
      setKoBtn(!koBtn)
      setEnBtn(false)
      setCurrentWordType(type)
    }
  }

  useEffect(() => {
    if (!enBtn && !koBtn) {
      setCurrentWordType(null)
    }
  }, [enBtn, koBtn, currentWordType])

  return (
    <>
      <Title>Today's words</Title>
      <Row>
        <FlexBox justify="flex-end">
          <ButtonGroup enBtn={enBtn} koBtn={koBtn} handleToggle={handleToggle} />
        </FlexBox>
      </Row>
      <FlexBox direction="column" gap="2">
        {
          todayList.map(word => (
            <WordItem key={`${word.en}-today`} word={word} type={currentWordType} showCheck={false}/>
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