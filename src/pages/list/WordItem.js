import FlexBox from '../../components/common/FlexBox'
import Button from '../../components/button/Button'
import {Check} from 'react-feather'
import Card from '../../components/common/Card'
import styled, {css} from 'styled-components'
import {useState} from 'react'
import useInterval from '../../hooks/useInterval'

const WordBox = styled.div`
  width: ${props => props.showCheck ? '85%' : '100%'};
`

const WordEn = styled.h4`
  position: relative;

  &:after {
    content: "";
    opacity: 0;
    position: absolute;
    top: 0;
    left: -0.1rem;
    width: 100%;
    height: 3rem;
    background-color: ${props => props.theme.bgColors.light};
    border-radius: .5rem;
    transition: 1s all;
    cursor: pointer;
    z-index: 10;
  }
  
  ${props => (props.type === "ko" && !props.effect) && css`
    &:after {
      opacity: 1;
    }
  `}
`

const WordKo = styled.p`
  position: relative;
  width: 100%;
  
  &:after {
    content: "";
    opacity: 0;
    position: absolute;
    top: .5rem;
    left: 0;
    width: 100%;
    height: 2rem;
    background-color: ${props => props.theme.bgColors.light};
    border-radius: .5rem;
    transition: .3s all;
    cursor: pointer;
    z-index: 10;
  }
  
  ${props => (props.type === "en" && !props.effect) && css`
    &:after {
      opacity: 1;
    }
  `}
`

const WordItem = ({word, handleCheck, type, showCheck}) => {
  const [effect, setEffect] = useState(false)
  const [timeLimitToShow, setTimeLimitToShow] = useState(null)

  const handleCurrentIndex = () => {
    setEffect(true)
    setTimeLimitToShow(5) // 5초후에 다시 초기화
  }

  useInterval(() => {
    setTimeLimitToShow(timeLimitToShow => (timeLimitToShow - 1))

    if (timeLimitToShow === 1) {
      setEffect(false)
    }
  }, timeLimitToShow ? 1000 : null)

  return (
    <Card key={word.id} bgColor="dark" border={word.level}>
      <FlexBox justify="space-between" align="center">
        <WordBox showCheck={showCheck} onClick={handleCurrentIndex}>
          <WordEn type={type} effect={effect}>{word.en}</WordEn>
          <WordKo type={type} effect={effect}>{word.ko}</WordKo>
        </WordBox>
        {showCheck ?
          (
            <Button bgColor={word.isCompleted ? 'greenOP' : 'gray'} size="small" icon onClick={handleCheck}>
              <Check />
            </Button>
          )
          : null
        }
      </FlexBox>
    </Card>
  )
}

export default WordItem