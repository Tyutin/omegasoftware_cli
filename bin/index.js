#!/usr/bin/env node

import  { program }  from 'commander';
import inquirer from 'inquirer'
import getErrorMessage from '../helpers/getErrorMessage.js'


program
  .version('2.0.0')
  .description('Нахождение последовательных полос с минимальной суммой высот.');

program
  .command('getMinIndex')
  .description('Нахождение начального индекса последовательности.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'n',
        message: 'Введите количество полос в изгороди (n)'
      },
      {
        type: 'input',
        name: 'h',
        message: 'Введите массив полос (h)'
      },
      {
        type: 'number',
        name: 'k',
        message: 'Введите количество полос которые нужно изъять (k)'
      },
    ]).then((options) => {
      const {n,h,k} = options
      const errorMessage = getErrorMessage(n,h,k)
      if (errorMessage) {
        throw new Error(errorMessage)
      }
      const arr = JSON.parse(h)

      if (k === n) {
        console.log(1) // т.к. 1 <= i <= n по условиям задачи
        return
      }
      let minSumm = arr.slice(0, k).reduce((acc,curr) => acc + curr)
      if (minSumm === k) { // предполагая, что минимальная высота полосы = 1
        console.log(1)
        return
      }

      let minIndex = 0
      let currSumm = minSumm

      for (let i = 1; i <= n-k; i++) {
        currSumm = currSumm - arr[i - 1] + arr[i + k - 1]
        if (currSumm < minSumm) {
          minSumm = currSumm
          minIndex = i
        }
        if (currSumm === k) { // предполагая, что минимальная высота полосы = 1
          break
        }
      }

      console.log(minIndex + 1)
    })
  })

program.parse(process.argv);