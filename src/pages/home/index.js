import FlexBox from '../../components/common/FlexBox'
import styled, {css} from 'styled-components'
import StyledButton from '../../components/button/Button'
import ProgressBar from '../../components/common/ProgressBar'
import Row from '../../components/common/Row'
import StyledCard from '../../components/common/Card'
import {useNavigate} from 'react-router-dom'
import {wordLevels} from '../../database/words'
import useWord, {todayWordListNumStates, wordListNumStates} from '../list/store/useWord'
import {useRecoilValue} from 'recoil'
import useUser from "../auth/store/useUser"
import {useEffect, useState} from 'react'
import {shuffleArray, todayDate} from '../../utility'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import './swiper.scss'
import 'swiper/css/pagination'
import {Pagination} from 'swiper'

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

const SwiperWrap = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-bottom: 3rem;

  &:after {
    content: "";
    opacity: 0;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 8%;
    height: 12.3rem;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,0) 1%, rgba(0,0,0,0.5) 100%);
    z-index: 10;
  }

  &:before {
    content: "";
    opacity: 0;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 8%;
    height: 12.3rem;
    background: rgb(255,255,255);
    background: linear-gradient(-90deg, rgba(255,255,255,0) 1%, rgba(0,0,0,0.5) 100%);
    z-index: 10;
  }
  
  ${props => props.swiperIndex < 9 && props.swiperIndex !== 0 ? css`
    &:after {
      opacity: 1;
    }
    &:before {
      opacity: 1;
    }
  ` : props.swiperIndex === 0 ? css`
    &:after {
      opacity: 1;
    }
  ` : css`
    &:before {
      opacity: 1;
    }
  `}
`

const Home = () => {
  // ** hooks
  const navigate = useNavigate()
  const {currentUser} = useUser()
  const {words, todayList, setTodayList} = useWord()

  // ** recoil
  const {basicNum, interNum, advanNum} = useRecoilValue(wordListNumStates)
  const {todayTotalNum, todayCompletedNum, todayPercentage} = useRecoilValue(todayWordListNumStates)

  // ** state
  const [swiperIndex, setSwiperIndex] = useState(0)

  const goListPage = (level) => {
    navigate(`/list/${level}`)
  }

  useEffect(() => {
    // history가 있거나, 오늘의 퀴즈를 이미 본 경우, 오늘 본 퀴즈 리스트 출력
    if (currentUser.history && Object.keys(currentUser.history)[0] === todayDate) {
      setTodayList(currentUser.history[Object.keys(currentUser.history)[0]])
    } else {
      // history가 없거나, 오늘의 퀴즈를 아직 보지 않은 경우, 랜덤 today list 생성
      if (todayList.length === 0) {
        setTodayList(shuffleArray(words).slice(0, 10))
      }
    }
  }, [])

  return (
    <>
      <Title>Good Evening, {currentUser.name}!</Title>
      <Row>
        <p>Your Progress Today: {todayCompletedNum} / {todayTotalNum} words</p>
        <ProgressBar percent={todayPercentage}/>
      </Row>

      <Row>
        <RowTitle>Practice English</RowTitle>
        <SwiperWrap swiperIndex={swiperIndex}>
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            pagination={{
              clickable: true
            }}
            onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
            modules={[Pagination]}
          >
            {
              todayList.length > 0 ? (
                todayList.map((item, idx) => (
                  <SwiperSlide key={item.id}>
                    <Card bgColor={Number(idx) % 2 ? 'pink': 'primary'}>
                      <FlexBox justify="space-between" align="center">
                        <div>
                          <CardTitle>Word of the day</CardTitle>
                          <Strong>{item.en}</Strong>
                        </div>
                        <div>
                          <CardButton onClick={() => navigate(`/today`)}>View more ></CardButton>
                        </div>
                      </FlexBox>
                    </Card>
                  </SwiperSlide>
                ))
              ) : null
            }
          </Swiper>
        </SwiperWrap>
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