import Row from '../../components/common/Row'
import FlexBox from '../../components/common/FlexBox'
import WordItem from '../list/WordItem'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import StyledButton from '../../components/button/Button'


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

const Result = ({setCurrentIndex, todayList, done}) => {
  const navigate = useNavigate()

  const handleRetry = () => {
    // TODO:: 틀린 단어들만!
    setCurrentIndex(0)
  }

  const handleBackToListBtn = () => {
    navigate('/today')
  }

  if (done) {
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
          <FlexBox direction="column" gap="2">
            <Button bgColor="primary" onClick={handleRetry}>Let's try Again</Button>
            <Button bgColor="secondary" onClick={handleBackToListBtn}>Back to List</Button>
          </FlexBox>
        </Row>
      </>
    )
  }
}

export default Result