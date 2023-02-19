import FlexBox from '../../components/common/FlexBox'
import styled from 'styled-components'
import StyledButton from '../../components/common/Button'
import ProgressBar from '../../components/common/ProgressBar'
import Row from '../../components/common/Row'
import StyledCard from '../../components/common/Card'
import {useNavigate} from 'react-router-dom'
import {wordLevels} from '../../database/words'
import {wordListNumStates} from '../list/store/useWord'
import {useRecoilValue} from 'recoil'
import useUser from "../auth/store/useUser";

const Title = styled.h1`
  font-weight: bold;
`

const RowTitle = styled.h2`
  padding-bottom: 2rem;
  font-weight: bold;
`

const Card = styled(StyledCard)`
  &:hover {
    transform: ${props => {
      if (props.hover) return `translate(.5rem, -.5rem)`;
    }};
  }
`

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.text.lightGray};
`

const Strong = styled.strong`
  display: block;
  padding: 1rem 0;
  font-size: 2.5rem;
  font-weight: 500;
`

const CardButton = styled(StyledButton)`
  padding: 1rem 0;
`

const Home = () => {
  // ** hooks
  const navigate = useNavigate()

  // ** recoil
  const {basicNum, interNum, advanNum} = useRecoilValue(wordListNumStates)
  const {currentUser} = useUser()

  const goListPage = (level) => {
    navigate(`/list/${level}`)
  }

  return (
    <>
      <Title>Good Evening, {currentUser.name}!</Title>
      <Row>
        <p>Your Progress Today: 5/10 words</p>
        <ProgressBar />
      </Row>

      <Row>
        <RowTitle>Practice English</RowTitle>
        <Card bgColor="primary">
          <FlexBox justify="space-between" align="center">
            <div>
              <CardTitle>Word of the day</CardTitle>
              <Strong>Perro</Strong>
            </div>
            <div>
              <CardButton onClick={() => navigate(`/today`)}>View more ></CardButton>
            </div>
          </FlexBox>
        </Card>
      </Row>

      <Row>
        <RowTitle>Study by Level</RowTitle>
        <FlexBox direction="column" justify="space-between" gap="2">
          <FlexBox gap="2">
            <Card bgColor="sky" hover onClick={() => goListPage(wordLevels.basic)}>
              <h4>Basic</h4>
              <p>{basicNum} new words</p>
            </Card>
            <Card bgColor="secondary" hover onClick={() => goListPage(wordLevels.intermediate)}>
              <h4>Intermediate</h4>
              <p>{interNum} new words</p>
            </Card>
          </FlexBox>
          <Card bgColor="purple" hover onClick={() => goListPage(wordLevels.advanced)}>
            <h4>Advanced</h4>
            <p>{advanNum} new words</p>
          </Card>
        </FlexBox>
      </Row>
    </>
  )
}

export default Home