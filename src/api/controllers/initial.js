const {
  createInitial,
  getAll
} = require('../repositories/initial')

const postMessage = async (req, res) => {
  try {
    const inital = await createInitial({
      name: 'TestInital',
      count: 1,
      ExampleArray: [{
        some_id: '1'
      }],
      exampleArrayWithSchema: [
        {
          some_id: '2',
          name: 'Second'
        },
        {
          some_id: '3',
          name: 'Third'
        }
      ]
    })
    console.log(inital)
    res.status(201)
    return res.json({ message: 'Example inital model saved.' })
  } catch (err) {
    console.log(err)
  }
}

const getMessages = async (req, res) => {
  const initals = await getAll()
  return res.json(initals)
}

const initialMessage = (req, res) => {
  console.log('This is the initial message 1234!')
  return res.json({
    message: 'This is the initial message 1234!'
  })
}

module.exports = {
  initialMessage,
  postMessage,
  getMessages
}
