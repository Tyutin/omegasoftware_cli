const errorMessages = {
  invalidData: 'Ошибка ввода данных!',
  invalidN: 'Количество полос в изгороди (n) должно быть натуральным числом',
  invalidK: 'Количество полос которые нужно изъять (k) должно быть натуральным числом',
  invalidH: 'Массив полос (h) должен быть массивом целых чисел. Например [1,2,3,4]',
  kMoreThenN: 'Количество полос которые нужно изъять (k) должно быть меньше количества полос в изгороди (n)',
  nIsNotEqualToH: 'Длина массива полос (h) должна быть равна количеству полос в изгороди (n)'
}

export default function getErrorMessage(n,h,k) {
  const errorList = []
  let arr
  if(!Number.isInteger(n) || n < 1) {
    errorList.push(errorMessages.invalidN)
  }
  if(!Number.isInteger(k) || k < 1) {
    errorList.push(errorMessages.invalidK)
  }
  if (Number.isInteger(k) && Number.isInteger(n) && k>n) {
    errorList.push(errorMessages.kMoreThenN)
  }
  try {
    arr = JSON.parse(h)
  } catch {
    errorList.push(errorMessages.invalidH)
  }
  if (!!arr) {
    if (!arr.every((el) => Number.isInteger(el))) {
      errorList.push(errorMessages.invalidH)
    }
    if (arr.length !== n) {
      errorList.push(errorMessages.nIsNotEqualToH)
    }
  }
  if(errorList.length) {
    errorList.unshift(errorMessages.invalidData)
    return errorList.join('\n')
  }
  return null
}