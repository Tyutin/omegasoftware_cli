#!/usr/bin/env node

const yargs = require("yargs")

const args = yargs(process.argv.slice(2)).argv

const {n,h,k} = args
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