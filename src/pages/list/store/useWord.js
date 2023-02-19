import {atom, selector, useRecoilValue} from 'recoil'
import {wordLevels} from '../../../database/words'
import {currentUserState} from "../../auth/store/useUser"

export const wordListFilterState = atom({
  key: 'wordListFilterState',
  default: 'all',
})

export const wordListNumStates = selector({
  key: 'wordListNumStates',
  get: ({get}) => {
    const user = get(currentUserState)
    const list = user.words
    const totalNum = list.length;
    const totalCompletedNum = list.filter((item) => item.isCompleted).length
    const totalUnCompletedNum = totalNum - totalCompletedNum
    const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100

    const basicNum = list.filter((item) => item.level === wordLevels.basic).length
    const interNum = list.filter((item) => item.level === wordLevels.intermediate).length
    const advanNum = list.filter((item) => item.level === wordLevels.advanced).length

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
      percentCompleted,
      basicNum,
      interNum,
      advanNum
    }
  }
})

export const randomWordListState = selector({
  key: 'randomWordListState',
  get: ({get}) => {
    const user = get(currentUserState)
    const list = user.words
    const unCompletedList = list.filter((item) => !item.isCompleted)
    const randomTodayList = unCompletedList.sort(() => Math.random() - 0.5).slice(0, 10)
    const notTodayList = unCompletedList.filter(item => !randomTodayList.includes(item))

    return randomTodayList
  }
})

const filteredWordListState = selector({
  key: 'filteredWordListState',
  get: ({get}) => {
    const filter = get(wordListFilterState)
    const user = get(currentUserState)
    const list = user.words

    switch (filter) {
      case wordLevels.basic:
        return list.filter((item) => item.level === wordLevels.basic)
      case wordLevels.intermediate:
        return list.filter((item) => item.level === wordLevels.intermediate)
      case wordLevels.advanced:
        return list.filter((item) => item.level === wordLevels.advanced)
      default:
        return list
    }
  }
})

const useWord = () => {
  const filteredWordList = useRecoilValue(filteredWordListState)

  return {
    filteredWordList
  }
}

export default useWord