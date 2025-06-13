export interface IPostAccountBody {
  id: string
  username: string
  first_name: string
  last_name: string
}

export interface IResetParams {
  token: string
  uid: string
}

export interface IPostChangePassword extends IResetParams {
  password: string
}

export interface IPostChangeEmail extends IResetParams {
  email: string
}
