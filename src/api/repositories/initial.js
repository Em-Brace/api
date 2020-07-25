const Initial = require('../models/initial')

async function createInitial (initialData) {
  const initial = new Initial(initialData)
  console.log(initial)
  const result = await initial.save()
  return result
}

const getAll = async () => {
  const initials = await Initial.find({})
  return initials
}

module.exports = {
  createInitial,
  getAll
}
