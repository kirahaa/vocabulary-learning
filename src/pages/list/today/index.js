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
import useUser from '../../auth/store/useUser'
import {todayDate as date} from '../../../utility'

const Button = styled(StyledButton)`
  font-size: 2rem;
`

const Today = () => {
  // ** hooks
  const navigate = useNavigate()
  const {currentUser, setCurrentUser} = useUser()
  const {todayList, setTodayList} = useWord()

  // ** states
  const [enBtn, setEnBtn] = useState(true) // 기본 모드
  const [koBtn, setKoBtn] = useState(false)
  const [currentWordType, setCurrentWordType] = useState(wordType.type1)
  const [isRetake, setIsRetake] = useState(false)

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

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  const handleQuizBtn = () => {
    if (isRetake) {
      if (window.confirm('시험을 다시 볼 경우 이전 기록이 초기화됩니다.\n그래도 시험을 다시 보시겠습니까?')) {
        navigate('/quiz')
        setCurrentUser({
          ...currentUser,
          history: {
            ...currentUser.history,
            [date]: currentUser.history[date].map(item => item ? {...item, isCompleted: false} : item)
          }
        })
      }
    } else {
      navigate('/quiz')
      let groupedList = groupBy(todayList, 'date')
      // 현재 사용자 history에 추가
      setCurrentUser({
        ...currentUser,
        history: currentUser.history ? {...groupedList, ...currentUser.history} : groupedList
      })
    }
  }

  useEffect(() => {
    if (!enBtn && !koBtn) {
      setCurrentWordType(null)
    }
  }, [enBtn, koBtn, currentWordType])

  useEffect(() => {
    if (currentUser.history && Object.keys(currentUser.history)[0] === date) {
      setTodayList(currentUser.history[Object.keys(currentUser.history)[0]].map(item => item ? {...item, date: date} : item))
      setIsRetake(true) // 재시험보는 경우
    } else {
      // history 없는데 새로고침 했을 경우,
      if (todayList.length === 0) {
        alert('잘못된 접근입니다.')
        navigate('/')
      } else {
        setTodayList(todayList.map(item => item ? {...item, date: date} : item))
      }
      setIsRetake(false) // 오늘 처음 시험 보는 경우
    }
  }, [])

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
        <Button bgColor="primary" onClick={handleQuizBtn}>Let's {isRetake ? 'retake' : 'take'} a quiz!</Button>
      </Row>
    </>
  )
}

export default Today