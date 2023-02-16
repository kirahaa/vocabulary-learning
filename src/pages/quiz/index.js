import {useRecoilValue} from 'recoil'
import {randomWordListState} from '../list/store/useWord'

const Quiz = () => {
  const {randomTodayList} = useRecoilValue(randomWordListState)

  return (
    <>
      quiz
    </>
  )
}

export default Quiz