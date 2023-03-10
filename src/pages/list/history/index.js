import Title from '../../../components/common/Title'
import Row from '../../../components/common/Row'
import FlexBox from '../../../components/common/FlexBox'
import ButtonGroup from '../../../components/button/ButtonGroup'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import useUser from '../../auth/store/useUser'
import WordItem from '../WordItem'
import {wordType} from '../../../database/words'
import styled from 'styled-components'
import StyledButton from "../../../components/button/Button"
import {todayDate as date} from "../../../utility"
import {useSetRecoilState} from "recoil"
import {currentQuizListState} from "../store/useWord"

const Button = styled(StyledButton)`
  font-size: 2rem;
`

const QuizResult = styled(FlexBox)`
  margin: 0 auto;
  width: 15rem;
  height: 15rem;
  border: 1px solid ${props => props.theme.pink};
  border-radius: 50%;
  font-size: 3rem;
  font-weight: bold;
`

const History = () => {
  // ** hooks
  const { date: params } = useParams()
  const navigate = useNavigate()
  const {currentUser} = useUser()

  // ** recoil
  const setQuizList = useSetRecoilState(currentQuizListState)

  // ** states
  const [list, setList] = useState([])
  const [enBtn, setEnBtn] = useState(true) // 기본 모드
  const [koBtn, setKoBtn] = useState(false)
  const [currentWordType, setCurrentWordType] = useState(wordType.type1)
  const [isNotCompleted, setIsNotCompleted] = useState(false)

  const handleRetakeQuiz = () => {
    // 아직 못 맞춘 단어가 있을 경우에만
    if (isNotCompleted) {
      setQuizList(currentUser.history[date].filter(item => !item.isCompleted))
      navigate('/quiz')
    }
  }

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

  useEffect(() => {
    let isIncludedIn = Object.keys(currentUser.history).some(item => item === params)

    if (!isIncludedIn) {
      alert('잘못된 경로입니다.')
      navigate('/')
    } else {
      setList(currentUser.history[params])
      setIsNotCompleted(currentUser.history[params].filter(item => !item.isCompleted).length > 0)
    }
  }, [])

  return (
    <>
      <Title>{params}</Title>
      <Row>
        <FlexBox justify="flex-end">
          <ButtonGroup enBtn={enBtn} koBtn={koBtn} handleToggle={handleToggle} />
        </FlexBox>
      </Row>
      <Row>
        <QuizResult justify="center" align="center">
          {list.filter(item => item.isCompleted).length} / {list.length > 0 && list.length}
        </QuizResult>
      </Row>
      <FlexBox direction="column" gap="2">
        {
          list.length > 0 ? (
            list.map(word => (
              <WordItem key={`${word.id}-history`} word={word} type={currentWordType} showCheck={true} />
            ))
          ) : null
        }
      </FlexBox>
      {params === date && isNotCompleted ? (
        <Row>
          <Button bgColor="primary" onClick={handleRetakeQuiz}>Let's retake quiz!</Button>
        </Row>
      ) : null}
    </>
  )
}

export default History