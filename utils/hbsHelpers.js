const moment = require('moment');
const handlebars = require('handlebars')
const hbsHelpers = (handlebars) => {
  handlebars.registerHelper('formatDate', function(dataString) {
    return new handlebars.SafeString(
      moment(dataString).format("DD.MM.YYYY").toUpperCase()
    )
  })
}

handlebars.registerHelper('paginate', require('handlebars-paginate'))

module.exports = hbsHelpers