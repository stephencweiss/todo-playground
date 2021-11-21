import { app } from './server/app'

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
