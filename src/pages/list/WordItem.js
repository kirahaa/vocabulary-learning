import FlexBox from '../../components/common/FlexBox'
import Button from '../../components/common/Button'
import {Check} from 'react-feather'
import Card from '../../components/common/Card'

const WordItem = ({word, handleCheck}) => {
  return (
    <Card key={word.id} bgColor="dark" border={word.level}>
      <FlexBox justify="space-between" align="center">
        <div>
          <h4>{word.en}</h4>
          <p>{word.ko}</p>
        </div>
        <Button bgColor={word.isCompleted ? 'greenOP' : 'gray'} size="small" icon onClick={() => handleCheck(word.id)}>
          <Check />
        </Button>
      </FlexBox>
    </Card>
  )
}

export default WordItem