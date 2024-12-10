import { loginFormSchema, LoginFormType } from 'src/types/form'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(loginFormSchema) })
  const login = async (data: LoginFormType) => {
    console.log(data)
  }
  return (
    <Card className="mx-2 md:mx-0">
      <form onSubmit={handleSubmit(login)}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your details to login.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              id="username"
              type="username"
              placeholder="John Doe"
              className={`${errors.username?.message ? 'border-red-500' : ''}`}
            />
            {errors.username?.message && <p className="text-sm text-red-500">{errors.username?.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password')}
              id="password"
              type="password"
              placeholder="****"
              className={`${errors.password?.message ? 'border-red-500' : ''}`}
            />
            {errors.password?.message && <p className="text-sm text-red-500">{errors.password?.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
