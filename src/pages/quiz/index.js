import {useRecoilState, useRecoilValue} from 'recoil'
import {
  currentQuizListState,
  currentQuizWordState,
  randomNotTodayListState,
} from '../list/store/useWord'
import StyledCard from '../../components/common/Card'
import styled from 'styled-components'
import Row from '../../components/common/Row'
import FlexBox from '../../components/common/FlexBox'
import Title from '../../components/common/Title'
import {useEffect, useState} from 'react'
import Result from './Result'
import useUser from '../auth/store/useUser'
import {
  randomFunc,
  todayDate as date
} from '../../utility'
import ProgressBar from '../../components/common/ProgressBar'
import {wordType} from '../../database/words'

const Card = styled(StyledCard)`
  text-align: center;
  
  h4 {
    font-weight: 500;
    font-family: 'Noto Sans KR', sans-serif;
  }
  p {
    padding-top: 0;
    font-family: 'Noto Sans KR', sans-serif;
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
  const [list, setList] = useRecoilState(currentQuizListState)
  const [currentIndex, setCurrentIndex] = useRecoilState(currentQuizWordState)
  const randomOptions = useRecoilValue(randomNotTodayListState)

  // ** state
  const [done, setDone] = useState(false)
  const [percent, setPercent] = useState(0)
  const [currentLang, setCurrentLang] = useState(wordType.type1) // 현재 퀴즈 언어
  const [optionLang, setOptionLang] = useState(wordType.type2) // 옵션 언어

  // 랜덤 언어 설정
  const handleRandomLang = () => {
    if (randomFunc()) {
      setCurrentLang(wordType.type1)
      setOptionLang(wordType.type2)
    } else {
      setCurrentLang(wordType.type2)
      setOptionLang(wordType.type1)
    }
  }

  const handleAnswerCheck = (id) => {
    let currentList = list.map(item => {
      return item.id === id ? {...item, isCompleted: true} : item
    })
    setList(currentList)
    // history 업데이트
    setCurrentUser({
      ...currentUser,
      history: {
        ...currentUser.history,
        [date]: currentUser.history[date].map(item => {
          return item.id === id ? {...item, isCompleted: true} : item
        })
      }
    })

    handleRandomLang()
    setCurrentIndex((currentIndex) => (currentIndex + 1))
  }

  useEffect(() => {
    if (list.length > 0 && currentIndex === list.length) {
      setDone(true)
    } else {
      setDone(false)
    }
  }, [currentIndex])

  useEffect(() => {
    if (list.length > 0) {
      setPercent(Number(Number(currentIndex) / Number(list.length)) * 100)
    }
  }, [list])

  useEffect(() => {
    if (list.length === 0) {
      setList(currentUser.history[date].map(item => item))
    }
    return () => {
      setCurrentIndex(0) // 인덱스 초기화
    }
  }, [])

  return (
    <>
      <Title>Today's Quiz</Title>
      {list.length > 0 ? (
        <>
          {
            list.map((item, id) => (
              <Content key={`quiz-item-${id}`} currentIndex={id === currentIndex}>
                <CurrentIndex>{currentIndex + 1} / {list.length}</CurrentIndex>
                <ProgressBar percent={percent}/>
                <Row>
                  <Card bgColor="primary">
                    <p>{currentLang === wordType.type1 ? '해당 단어의 뜻은?' : '아래 뜻의 단어는?'}</p>
                    <h4>{item[currentLang]}</h4>
                  </Card>
                </Row>
                <FlexBox direction="column" gap="2">
                  {randomOptions ? randomOptions.map(item => (
                    <Card key={`quiz-option-${item.id}`} border onClick={() => handleAnswerCheck(item.id)}>{item[optionLang]}</Card>
                  )) : null}
                </FlexBox>
              </Content>
            ))
          }
          {/* 결과 */}
          <Result
            setCurrentIndex={setCurrentIndex}
            todayList={currentUser.history[date].map(item => item)}
            setCurrentList={setList}
            done={done}
          />
        </>
      ) : null}
    </>
  )
}

export default Quiz