import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export const config = {
  port: process.env.PORT ?? 3000,

  /**
   * Database connections
   */
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  jwtExpiryDays: 60,

  // TODO revisit the remaining of this config
  //
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY ?? '', 10),
  },

  /**
   * Agendash config
   */
  agendash: {
    user: 'agendash',
    password: '123456',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN,
  },
}
