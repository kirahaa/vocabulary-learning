import {useRecoilState, useRecoilValue} from 'recoil'
import {
  currentQuizWordState,
  randomNotTodayListState,
  randomTodayListState
} from '../list/store/useWord'
import StyledCard from '../../components/common/Card'
import styled from 'styled-components'
import Row from '../../components/common/Row'
import FlexBox from '../../components/common/FlexBox'
import Title from '../../components/common/Title'
import WordItem from '../list/WordItem'
import StyledButton from '../../components/common/Button'
import useUser from "../auth/store/useUser"

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

const Quiz = () => {
  // ** recoil
  const randomTodayList = useRecoilValue(randomTodayListState)
  const [currentIndex, setCurrentIndex] = useRecoilState(currentQuizWordState)
  const randomOptions = useRecoilValue(randomNotTodayListState)

  // const {currentUser, setCurrentUser} = useUser()

  const handleAnswerCheck = (id) => {
    let currentWord = randomTodayList[currentIndex].id

    randomTodayList.map(item => {
      // TODO:: 만약에 정답이면, todayList의 해당 요소에 corrent: true
    })

    setCurrentIndex((currentIndex) => (currentIndex + 1))
  }

  const handleWordCheck = (id) => {
    console.log(id, 'id')
  }

  const Result = () => {
    if (currentIndex > 9) {
      return (
        <>
          <Row>
            {/* TODO:: 결과 화면 만들기~!  */}
          </Row>
          <FlexBox direction="column" gap="2">
            {
              randomTodayList.map(item => (
                <WordItem key={`result-item-${item.id}`} word={item} handleCheck={() => handleWordCheck(item.id)} />
              ))
            }
          </FlexBox>
          <Row>
            <Button bgColor="primary">Retry</Button>
          </Row>
        </>
      )
    }
  }

  // useEffect(() => {
  //   setCurrentUser({
  //     ...currentUser,
  //     todayWordList: randomTodayList
  //   })
  // }, [])

  return (
    <>
      <Title>Today's Quiz</Title>
      {randomTodayList.length > 0 ? (
        <>
          {
            randomTodayList.map((item, id) => (
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