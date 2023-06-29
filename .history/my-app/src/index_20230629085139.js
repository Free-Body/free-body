const PORT = process.env.PORT || 8080
const app = require('./app')

const init = async () => {
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } 

init()
