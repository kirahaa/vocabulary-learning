import {useRecoilState, useRecoilValue} from 'recoil'
import {
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
import useUser from '../auth/store/useUser'
import {shuffleNSliceArray, todayDate as date} from '../../utility'
import ProgressBar from '../../components/common/ProgressBar'

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

const CurrentIndex = styled.p`
  text-align: right;
`

const Quiz = () => {
  // ** hook
  const {currentUser, setCurrentUser} = useUser()

  // ** recoil
  const [currentIndex, setCurrentIndex] = useRecoilState(currentQuizWordState)
  const randomOptions = useRecoilValue(randomNotTodayListState)

  // ** state
  const [list, setList] = useState(null)
  const [done, setDone] = useState(false)
  const [percent, setPercent] = useState(0)

  // ** variables
  const ok = Object.keys(currentUser.history)[0] === date

  const handleAnswerCheck = (id) => {
    let currentList = list.map(item => {
      return item.id === id ? {...item, isCompleted: true} : item
    })
    setList(currentList)
    setCurrentUser({
      ...currentUser,
      history: {
        ...currentUser.history,
        [date]: currentList
      }
    })
    setCurrentIndex((currentIndex) => (currentIndex + 1))
  }

  useEffect(() => {
    if (list && currentIndex === list.length) {
      setDone(true)
    } else {
      setDone(false)
    }
  }, [currentIndex])

  useEffect(() => {
    if (list) {
      setPercent(Number(Number(currentIndex) / Number(list.length)) * 100)
    }
  }, [list])

  useEffect(() => {
    if (ok) {
      setList(shuffleNSliceArray(currentUser.history[date].map(item => item)))
    }
    return () => {
      setCurrentIndex(0) // 인덱스 초기화
    }
  }, [])

  return (
    <>
      <Title>Today's Quiz</Title>
      {list ? (
        <>
          {
            list.map((item, id) => (
              <Content key={`quiz-item-${id}`} currentIndex={id === currentIndex}>
                <CurrentIndex>{currentIndex + 1} / {list.length}</CurrentIndex>
                <ProgressBar percent={percent}/>
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
            todayList={list}
            done={done}
          />
        </>
      ) : null}
    </>
  )
}

export default Quiz