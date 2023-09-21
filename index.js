const express = require('express')
const app = express()

app.use(express.json())

let notes =[
  {
    id: 1,
    type: 'IRISH PUB',
    title: 'Waxy O\' Connors\'s London',
    startingTime: '2023-09-21 15:00',
    image: require('../assets/images/event_1.png'),
    description:
      'Non exercitation ullamco reprehenderit incididunt. Officia incididunt id exercitation velit aliqua ut deserunt do non. Aliquip sunt dolor enim occaecat ullamco id consectetur .',
       },
  {
    id: 2,
    type: 'AFRICAN RESTAURANT',
    title: 'Enish',
    startingTime: '2023-09-25 15:00',
    image: require('../assets/images/event_2.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur elit adipiscing elit. Venenatis pulvinar a amet in, suspendisse vitae, posuere eu tortor et. Und commodo, fermentum, mauris leo eget.',
    },
   {
    id: 3,
    type: 'PUB',
    title: 'The Royal Oak',
    startingTime: '2023-10-21 11:00',
    image: require('../assets/images/event_3.png'),
    description:
      'Non exercitation ullamco reprehenderit incididunt. Officia incididunt id exercitation velit aliqua ut deserunt do non. Aliquip sunt dolor enim occaecat ullamco id consectetur .',
  },
  {
    id: 4,
    type: 'AFRICAN RESTAURANT',
    title: 'Akoko',
    startingTime: '2023-08-25 12:00',
    image: require('../assets/images/event_4.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur elit adipiscing elit. Venenatis pulvinar a amet in, suspendisse vitae, posuere eu tortor et. Und commodo, fermentum, mauris leo eget.',
   },
   {
    id: 5,
    type: 'BAR & LOUNGE',
    title: 'Ku Lounge',
    startingTime: '2023-09-21 09:10',
    image: require('../assets/images/event_5.png'),
    description:
      'Non exercitation ullamco reprehenderit incididunt. Officia incididunt id exercitation velit aliqua ut deserunt do non. Aliquip sunt dolor enim occaecat ullamco id consectetur .',
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
