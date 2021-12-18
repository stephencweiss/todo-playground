export type UserDTO = {
  username: string
  email: string
  password: string
  bio?: string
  image?: string
}

export type User = {
  username: string
  email: string
  hash: string
  salt: string
  bio?: string
  image?: string
}
