'use strict'

let data = new Map()

data.set('1', {
  id: 1,
  title: 'Interstellar',
  year: '2014',
  summary: "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole",
  category: 'Science Fiction'
})
data.set('2', {
  id: 2,
  title: 'The Matrix',
  year: '1999',
  summary: 'Neo (Keanu Reeves) believes that Morpheus (Laurence Fishburne), an elusive figure considered to be the most dangerous man alive, can answer his question -- What is the Matrix?',
  category: 'Science Fiction'
})
data.set('3', {
  id: 3,
  title: 'Back to the Future',
  year: '1985',
  summary: "In this 1980s sci-fi classic, small-town California teen Marty McFly (Michael J. Fox) is thrown back into the '50s when an experiment by his eccentric scientist friend Doc Brown (Christopher Lloyd) goes awry. Traveling through time in a modified DeLorean car",
  category: 'Science Fiction'
})

module.exports = data