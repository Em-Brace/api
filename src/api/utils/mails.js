const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')
const { mails } = require('../../config')

const compileTemplate = async (templateName, context) => {
  const templatePath = path.resolve(mails.template_path, templateName)
  const template = fs.readFileSync(`${templatePath}.hbs`, 'utf8')
  var compiled = Handlebars.compile(template)

  return compiled(context)
}

module.exports = {
  compileTemplate
}
