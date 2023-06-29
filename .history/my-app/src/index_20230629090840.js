const PORT = process.env.PORT || 3000
const app = require('./app/App')

const init = async () => {
    require.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } 

init()
module.exports = app;