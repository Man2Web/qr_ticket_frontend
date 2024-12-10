import { z } from 'zod'

export interface FormType {
  fName: string
  phoneNumber: string
}

export const formSchema = z.object({
  fName: z.string().min(5, 'Name Should be more than 5 charecters'),
  phoneNumber: z.string().min(10, 'Invalid Phone Number').max(10, 'Invalid Phone Number'),
})

export interface LoginFormType {
  username: string
  password: string
}

export const loginFormSchema = z.object({
  username: z.string().min(5, 'Username Should be more than 5 charecters'),
  password: z.string().min(5, 'Password Should be more than 5 charecters'),
})
