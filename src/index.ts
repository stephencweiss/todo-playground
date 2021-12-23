import { app } from './server/app'
import { config } from './config'

const PORT = config.port
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
