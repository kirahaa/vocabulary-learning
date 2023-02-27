import styled from 'styled-components'
import StyledCard from '../../components/common/Card'
import {useState} from 'react'

const Card = styled(StyledCard)`
  text-align: center;
  cursor: pointer;
  font-size: 1.6rem;
  line-height: inherit;
  
  h4 {
    font-weight: 500;
    font-family: 'Noto Sans KR', sans-serif;
  }
  p {
    padding-top: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
`

const Option = ({item, option, handleAnswerCheck, optionLang}) => {
  const [isCorrect, setIsCorrect] = useState(null)

  return (
    <Card
      as="button"
      border
      bgColor={isCorrect === true ? "primary" : (isCorrect === false ? "red" : "")}
      disabled={isCorrect !== null}
      onClick={() => {
        handleAnswerCheck(option.id);
        setIsCorrect(option.id === item.id ? true : false)}}>
      {option[optionLang]}
    </Card>
  )
}

export default Option