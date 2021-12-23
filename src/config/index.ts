import dotenv from 'dotenv'
import merge from 'lodash.merge'
import { Config } from './types'
import { config as devConfig } from './dev'
import { config as testingConfig } from './testing'
import { config as prodConfig } from './prod'

const envFound = dotenv.config()

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

// Set the NODE_ENV to 'development' by default
const env = process.env.NODE_ENV || 'development'

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig
    break
  case 'test':
  case 'testing':
    envConfig = testingConfig
    break
  default:
    envConfig = prodConfig
}

const baseConfig: Config = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',

  port: process.env.PORT ?? 3000,

  /**
   * Database connections
   */
  db: {
    name: process.env.DB_NAME ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
  },
  /**
   * Your secret sauce
   */
  secrets: {
    secretPhrase: process.env.JWT_SECRET ?? '',
    algorithm: process.env.JWT_ALGO ?? '',
    expiration: 60, // days
  },

  /**
   * Used by morgan logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'common',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
}

export const config = merge(baseConfig, envConfig)
