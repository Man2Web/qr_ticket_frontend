import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { formSchema, FormType } from 'src/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IndianRupee, Ticket } from 'lucide-react'
import axios from 'axios'
import { getTicketData } from 'src/hooks/getTicketData'

export default function PaymentForm({
  selectedTicket,
  setProgress,
}: {
  selectedTicket: { ticketId: string; numberOfTickets: number } | undefined
  setProgress: (data: number) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })
  const ticketData = getTicketData(selectedTicket?.ticketId)

  const onSubmit = async (data: FormType) => {
    const paymentData = {
      ...data,
      ...selectedTicket,
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}payments`, { paymentData })
      console.log(response.data.data.instrumentResponse.redirectInfo.url)
      if (response.status === 200) {
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Card className="mx-2 mt-8 md:mx-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl">Enter your details</CardTitle>
          <CardDescription>Enter your details below to complete booking.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fName">Full Name</Label>
            <Input
              {...register('fName')}
              id="fName"
              type="fName"
              placeholder="John Doe"
              className={`${errors.fName?.message ? 'border-red-500' : ''}`}
            />
            {errors.fName?.message && <p className="text-sm text-red-500">{errors.fName?.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              {...register('phoneNumber')}
              id="phoneNumber"
              type="phoneNumber"
              placeholder="8870877098"
              className={`${errors.phoneNumber?.message ? 'border-red-500' : ''}`}
            />
            {errors.phoneNumber?.message && <p className="text-sm text-red-500">{errors.phoneNumber?.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Total</Label>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Ticket />
                <p>{`${selectedTicket?.numberOfTickets} ${ticketData?.name}`}</p>
              </div>
              <div className="flex items-center">
                <IndianRupee size={12} />
                {Number(ticketData?.price) * Number(selectedTicket?.numberOfTickets)}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Reserve Now</Button>
          <Button type="button" onClick={() => setProgress(0)} className="w-full">
            Back
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
