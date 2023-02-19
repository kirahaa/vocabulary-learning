import {useRecoilValue} from 'recoil'
import {randomWordListState} from '../list/store/useWord'
import StyledCard from '../../components/common/Card'
import styled from 'styled-components'
import Row from '../../components/common/Row'
import FlexBox from '../../components/common/FlexBox'
import Title from '../../components/common/Title'
import {useState} from 'react'
import WordItem from '../list/WordItem'
import StyledButton from '../../components/common/Button'

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
  const randomTodayList = useRecoilValue(randomWordListState)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleAnswerCheck = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1))
  }

  const handleWordCheck = (id) => {
    // TODO:: 결과 페이지 핸들링하기~~!
  }

  return (
    <>
      <Title>Today's Quiz</Title>
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
              <Card border onClick={() => handleAnswerCheck()}>{item.ko}</Card>
              <Card border onClick={() => handleAnswerCheck()}>test</Card>
              <Card border onClick={() => handleAnswerCheck()}>test</Card>
            </FlexBox>
          </Content>
        ))
      }
      {/* [S] 결과 페이지 */}
      {
        currentIndex > 9 ? (
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
        ) : null
      }
      {/* [E] 결과 페이지 */}
    </>
  )
}

export default Quiz