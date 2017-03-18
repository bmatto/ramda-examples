import {
  both,
  complement,
  either,
  filter,
  forEach,
  map,
  pipe,
  prop,
  reduce
} from 'ramda'

// For Each
const candy = ['skittles', 'snickers', 'pez']

for (const n of candy) {
  console.log(n)
}
forEach(n => console.log(n), candy)
forEach(console.log, candy)

const logArray = forEach(console.log)

logArray(candy)

// Map
const numbers = [1, 2, 3]
const doubled = []

for (const n of numbers) {
  doubled.push(n * 2)
}

const double = x => x * 2

map(double, numbers)

// Filter | Reject
const people = [
  { name: 'Mike', age: 14 },
  { name: 'Tim', age: 18 },
  { name: 'Frank', age: 35 }
]
const under30 = person => person.age < 30

filter(under30)(people)

// Reduce
const add = (accum, value) => accum + value

reduce(add, 5, [1, 2, 3, 4])

// Complement
const isEven = x => x % 2 === 0

find(isEven, [1, 2, 3, 4, 5, 6])

const isOdd = complement(isEven)

find(isOdd, [1, 2, 3, 4, 5, 6])

// Both / Either
const OUR_COUNTRY = 'AlphaLoft'
const today = new Date()
const voters = [
  { name: 'Mike', age: 14, birthCountry: OUR_COUNTRY },
  { name: 'Bill', age: 50, birthCountry: OUR_COUNTRY },
  { name: 'Tim', age: 18, birthCountry: 'Russia' },
  { name: 'Frank', age: 35, birthCountry: 'Canada', naturalizationDate: today }
]
const wasBornInCountry = person => person.birthCountry === OUR_COUNTRY
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18

const isCitizen = person => wasBornInCountry(person) || wasNaturalized(person)
const isEligibleToVote = person => isOver18(person) && isCitizen(person)

// const isCitizen = either(wasBornInCountry, wasNaturalized)
// const isEligibleToVote = both(isOver18, isCitizen)

filter(isEligibleToVote, voters)

// Pipe, Compose
const folks = [
  { name: 'Mike', age: 14 },
  { name: 'Bill', age: 50 },
  { name: 'Tim', age: 18 },
  { name: 'Frank', age: 35 }
]

const teen = person => person.age < 20

pipe(
  filter(teen),
  map(prop('name'))
)(folks)
