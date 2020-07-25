const moment = require('moment')

const toMilliseconds = (string) => {
  const parts = string.split(' ')
  return moment.duration(parseInt(parts[0]), parts[1])._milliseconds
}

module.exports = {
  toMilliseconds
}
