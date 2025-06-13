// import type { IChatbotProject } from '../../project/model';

export interface IChatBotKnowledge {
  id: string
  name: string
  user: string
  created_at: string
}

export interface IChatbotProject {
  id: string
  name: string
  description: string
  greeting: string
  temperature: number
  knowladge: IChatBotKnowledge[]
  user: string
  model: string
  annotation_threshold: number
  fall_back_response: string
  instruction: string
}

export interface ICredential {
  refresh: string
  access: string
}

export type IRole = "admin"

export interface IUser {
  id: string
  username: string
  email: string
  projects: IChatbotProject[]
  role: IRole
  first_name: string
  last_name: string
  image: string
}

export interface IAuthResponse extends ICredential {
  user: IUser
}
