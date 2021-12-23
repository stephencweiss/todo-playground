type DB = {
  name?: string
  user?: string
  password?: string
}

type Secrets = {
  secretPhrase?: string
  algorithm?: string
  expiration?: number
}

type Logs = {
  level?: string
}

type Api = {
  prefix?: string
}

export type Config = {
  env?: any
  isDev?: boolean
  isTest?: boolean
  port?: string | number
  db?: DB
  secrets?: Secrets
  logs?: Logs
  api?: Api
}
