import FlexBox from '../../components/common/FlexBox'
import Button from '../../components/common/Button'
import {Check} from 'react-feather'
import Card from '../../components/common/Card'
import styled, {css} from 'styled-components'

const WordBox = styled.div`
  width: 100%;
`

const WordEn = styled.h4`
  position: relative;
  
  ${props => props.type === "ko" && css`
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3rem;
      background-color: ${props => props.theme.bgColors.light}; 
      border-radius: .5rem;
      z-index: 10;
    }
  `}
`

const WordKo = styled.p`
  position: relative;
  width: 100%;
  
  ${props => props.type === "en" && css`
    &:after {
      content: "";
      position: absolute;
      top: .5rem;
      left: 0;
      width: 100%;
      height: 2rem;
      background-color: ${props => props.theme.bgColors.light};
      border-radius: .5rem;
      z-index: 10;
    }
  `}
`

const WordItem = ({word, handleCheck, type, showCheck}) => {
  return (
    <Card key={word.id} bgColor="dark" border={word.level}>
      <FlexBox justify="space-between" align="center">
        <WordBox>
          <WordEn type={type}>{word.en}</WordEn>
          <WordKo type={type}>{word.ko}</WordKo>
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