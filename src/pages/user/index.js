import styled from 'styled-components'
import FlexBox from '../../components/common/FlexBox'
import StyledImage from '../../components/common/Image'
import ProgressBar from '../../components/common/ProgressBar'
import Button from '../../components/common/Button'
import Row from '../../components/common/Row'
import {FileText} from 'react-feather'
import Card from '../../components/common/Card'

const ImageWrap = styled.div`
  position: relative;
  width: 14rem;
  padding: 7rem 0;
`

const UserName = styled.h1`
  margin: 1rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
`

const Strong = styled.strong`
  display: block;
  font-size: 2.5rem;
`

const RowTitle = styled.h2`
  padding-bottom: 2rem;
  font-weight: bold;
`

const User = () => {
  return (
    <>
      <FlexBox justify="center">
        <ImageWrap>
          <StyledImage src={require('../../assets/images/user--0.jpg')} radius/>
        </ImageWrap>
      </FlexBox>
      <UserName>Haley</UserName>
      <Row>
        <p>Total Progress: 5 / 3000 words</p>
        <ProgressBar />
      </Row>
      <FlexBox gap="2">
        <Button bgColor="primary">
          <Strong>2000</Strong>
          Total
        </Button>
        <Button bgColor="secondary">
          <Strong>1231</Strong>
          Incompleted
        </Button>
        <Button bgColor="pink">
          <Strong>23</Strong>
          Completed
        </Button>
      </FlexBox>

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

export default User