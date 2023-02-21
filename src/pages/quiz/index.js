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
import {useEffect, useState} from 'react'
import Result from './Result'

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

const Quiz = () => {
  // ** hook
  const {todayList, setTodayList} = useWord()

  // ** recoil
  const [currentIndex, setCurrentIndex] = useRecoilState(currentQuizWordState)
  const randomOptions = useRecoilValue(randomNotTodayListState)

  // ** state
  const [done, setDone] = useState(false)

  // const {currentUser, setCurrentUser} = useUser()

  const handleAnswerCheck = (id) => {
    setTodayList(() => {
      return todayList.map(item => {
        return item.id === id ? {...item, isCompleted: true} : item
      })
    })

    setCurrentIndex((currentIndex) => (currentIndex + 1))
  }

  useEffect(() => {
    if (currentIndex === todayList.length) {
      setDone(true)
    } else {
      setDone(false)
    }
  }, [currentIndex])

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
          {/* 결과 */}
          <Result
            setCurrentIndex={setCurrentIndex}
            todayList={todayList}
            done={done}
          />
        </>
      ) : null}
    </>
  )
}

export default Quiz