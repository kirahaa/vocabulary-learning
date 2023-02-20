import {useRecoilState, useRecoilValue} from 'recoil'
import useWord, {
  currentQuizWordState,
  randomNotTodayListState
} from '../list/store/useWord'
import StyledCard from '../../components/common/Card'
import styled from 'styled-components'
import Row from '../../components/common/Row'
import FlexBox from '../../components/common/FlexBox'
import Title from '../../components/common/Title'
import WordItem from '../list/WordItem'
import StyledButton from '../../components/common/Button'
import useUser from "../auth/store/useUser"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

const Card = styled(StyledCard)`
  text-align: center;
  
  h4 {
    font-weight: 500;
  }
  p {
    padding-top: 0;
  }
`

const Content = styled.div`
  display: ${props => props.currentIndex ? 'block' : 'none'};
`

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

const Quiz = () => {
  // ** hook
  const navigate = useNavigate()
  const {todayList, setTodayList} = useWord()

  // ** recoil
  const [currentIndex, setCurrentIndex] = useRecoilState(currentQuizWordState)
  const randomOptions = useRecoilValue(randomNotTodayListState)

  // const {currentUser, setCurrentUser} = useUser()

  const handleAnswerCheck = (id) => {
    setTodayList(() => {
      return todayList.map(item => {
        return item.id === id ? {...item, isCompleted: true} : item
      })
    })

    setCurrentIndex((currentIndex) => (currentIndex + 1))
  }

  const Result = () => {
    const handleRetry = () => {
      // TODO:: 틀린 단어들만!
      setCurrentIndex(0)
    }

    const handleBackToListBtn = () => {
      navigate('/today')
    }

    if (currentIndex > 9) {
      return (
        <>
          <Row>
            <QuizResult justify="center" align="center">
              {todayList.filter(item => item.isCompleted).length} / {todayList.length}
            </QuizResult>
          </Row>
          <FlexBox direction="column" gap="2">
            {
              todayList.map(item => (
                <WordItem key={`result-item-${item.id}`} word={item} showCheck={true} />
              ))
            }
          </FlexBox>
          <Row>
            <FlexBox justify="space-between" gap="2">
              <Button bgColor="primary" onClick={handleRetry}>Let's try Again</Button>
              <Button bgColor="secondary" onClick={handleBackToListBtn}>Back to List</Button>
            </FlexBox>
          </Row>
        </>
      )
    }
  }

  useEffect(() => {
    console.log(todayList, 'todayList')
  }, [todayList])

  useEffect(() => {
    return () => {
      setCurrentIndex(0) // 인덱스 초기화
    }
  }, [])

  // useEffect(() => {
  //   setCurrentUser({
  //     ...currentUser,
  //     todayWordList: randomTodayList
  //   })
  // }, [])

  return (
    <>
      <Title>Today's Quiz</Title>
      {todayList.length > 0 ? (
        <>
          {
            todayList.map((item, id) => (
              <Content key={`quiz-item-${id}`} currentIndex={id === currentIndex}>
                <Row>
                  <Card bgColor="primary">
                    <p>이 단어의 뜻은?</p>
                    <h4>{item.en}</h4>
                  </Card>
                </Row>
                <FlexBox direction="column" gap="2">
                  {randomOptions ? randomOptions.map(item => (
                    <Card key={item.en} border onClick={() => handleAnswerCheck(item.id)}>{item.ko}</Card>
                  )) : null}
                </FlexBox>
              </Content>
            ))
          }
          {/* 결과 페이지 */}
          <Result />
        </>
      ) : null}
    </>
  )
}

export default Quiz