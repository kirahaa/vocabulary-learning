function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

export const toStringByFormatting = (source, delimiter = '-') => {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

export const todayDate = toStringByFormatting(new Date())

export const shuffleNSliceArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, 10)
}

export const randomFunc = () => {
  return Math.random() < 0.5
}