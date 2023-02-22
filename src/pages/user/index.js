import styled from 'styled-components'
import FlexBox from '../../components/common/FlexBox'
import StyledImage from '../../components/common/Image'
import ProgressBar from '../../components/common/ProgressBar'
import Button from '../../components/button/Button'
import Row from '../../components/common/Row'
import {FileText} from 'react-feather'
import Card from '../../components/common/Card'
import {useRecoilValue} from 'recoil'
import {wordListNumStates} from '../list/store/useWord'
import useUser from "../auth/store/useUser"

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
  // ** hook
  const {users, setUsers, currentUser, setCurrentUser} = useUser()

  // ** recoil states
  const {totalNum, totalCompletedNum, totalUnCompletedNum, percentCompleted} = useRecoilValue(wordListNumStates)

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      // users 업데이트
      setUsers(() => {
        return users.map(user => {
          return user.id === currentUser.id ? currentUser : user
        })
      })

      // currentUser 초기화
      setCurrentUser(null)
    }
  }

  return (
    <>
      <FlexBox justify="center">
        <ImageWrap>
          <StyledImage src={currentUser.profileImg} radius="true"/>
        </ImageWrap>
      </FlexBox>
      <UserName>{currentUser.name}</UserName>
      <Button bgColor="sky" onClick={handleLogout}>Logout</Button>

      <Row>
        <p>Total Progress: {totalCompletedNum} / {totalNum} words</p>
        <ProgressBar percent={percentCompleted}/>
      </Row>

      <FlexBox gap="2">
        <Button bgColor="primary">
          <Strong>{totalNum}</Strong>
          Total
        </Button>
        <Button bgColor="secondary">
          <Strong>{totalUnCompletedNum}</Strong>
          Uncompleted
        </Button>
        <Button bgColor="pink">
          <Strong>{totalCompletedNum}</Strong>
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