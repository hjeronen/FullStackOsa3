require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
morgan.token('post', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})

// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   }
// ]

app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   persons = persons.filter(person => person.id !== id)
//   res.status(204).end()
// })

// const generateId = (max) => {
//   let id = Math.floor(Math.random() * max)
//   let person = persons.find(p => p.id === id)

//   while (person) {
//     id = Math.floor(Math.random() * max)
//     person = persons.find(p => p.id === id)
//   }

//   return id
// }

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'missing name'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'missing number'
    })
  }

  // if (persons.find(p => p.name === body.name)) {
  //   return res.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })

})

app.get('/info', (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>`
  const date = `<p>${Date()}</p>`
  res.send(`<div>${info}${date}</div>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})