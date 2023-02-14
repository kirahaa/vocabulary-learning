import FlexBox from '../../components/common/FlexBox'
import {FileText} from 'react-feather'
import styled from 'styled-components'
import StyledButton from '../../components/common/Button'
import ProgressBar from '../../components/common/ProgressBar'
import Row from '../../components/common/Row'

const Title = styled.h1`
  font-weight: bold;
`

const RowTitle = styled.h2`
  padding-bottom: 2rem;
  font-weight: bold;
`

const Card = styled.div`
  width: 100%;
  padding: 3rem 2.5rem;
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 2rem;
  transition: .3s all;
  cursor: ${props => {
    if (props.hover) return 'pointer';
  }};
  
  h4 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  h5 {
    font-size: 2rem;
    font-weight: 500;
  }
  p {
    padding: 1rem 0;
    font-size: 1.4rem;
    color: ${props => props.theme.text.lightGray};
  }
  
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

  return (
    <>
      <Title>Good Evening, User!</Title>
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
              <CardButton>Learn more ></CardButton>
            </div>
          </FlexBox>
        </Card>
      </Row>

      <Row>
        <RowTitle>Study by Level</RowTitle>
        <FlexBox direction="column" justify="space-between" gap="2">
          <FlexBox gap="2">
            <Card bgColor="secondary" hover>
              <h4>Basic</h4>
              <p>100 new words</p>
            </Card>
            <Card bgColor="purple" hover>
              <h4>Intermediate</h4>
              <p>200 new words</p>
            </Card>
          </FlexBox>
          <Card bgColor="pink" hover>
            <h4>Advanced</h4>
            <p>100 new words</p>
          </Card>
        </FlexBox>
      </Row>

      <Row>
        <RowTitle>Your Scores</RowTitle>
        <FlexBox direction="column" gap="2">
          <Card bgColor="gray">
            <FlexBox gap="1">
              <FileText size={45}/>
              <div>
                <h5>23-02-15</h5>
                <p>5/10</p>
              </div>
            </FlexBox>
            <ProgressBar />
          </Card>
          <Card bgColor="gray">
            <FlexBox gap="1">
              <FileText size={45}/>
              <div>
                <h5>23-02-14</h5>
                <p>5/10</p>
              </div>
            </FlexBox>
            <ProgressBar />
          </Card>
        </FlexBox>
      </Row>
    </>
  )
}

export default Home