import {atom, selector, useRecoilValue} from 'recoil'
import {wordLevels, words} from '../../../database/words'
import {currentUserState} from "../../auth/store/useUser"

const wordListState = atom({
  key: 'wordListState',
  default: words
})

export const wordListFilterState = atom({
  key: 'wordListFilterState',
  default: 'all',
})

export const currentQuizWordState = atom({
  key: 'currentQuizWordState',
  default: 0
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

export const randomTodayListState = selector({
  key: 'randomTodayListState',
  get: ({get}) => {
    const words = get(wordListState)
    const randomTodayList = [...words].sort(() => Math.random() - 0.5).slice(0, 10)

    return randomTodayList
  }
})

export const randomNotTodayListState = selector({
  key: 'randomNotTodayListState',
  get: ({get}) => {
    const currentIndex = get(currentQuizWordState)
    const words = get(wordListState)
    const todayList = get(randomTodayListState)
    const notTodayList = [...words].sort(() => Math.random() - 0.5).filter(word => !todayList.includes(word)).slice(0, 2)
    const currentWord = todayList[currentIndex]
    const randomOptions = notTodayList.concat(currentWord)

    if (currentIndex > 9) { // 10개까지
      return null
    } else {
      return randomOptions
    }
  },
  set: ({get, set}, newValue) => {
    const todayList = get(randomTodayListState)
    // TODO:: todayList 업데이트!
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