import { MinusIcon, PlusIcon, Ticket, TrashIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function TicketCard({
  ticketId,
  title,
  description,
  points,
  disabled,
  setSelectedTicket,
  selectedTicket,
}: TicketProps) {
  const onTicketSelected = (ticketId: string) => {
    setSelectedTicket({ ticketId: ticketId, numberOfTickets: 1 })
  }
  const updateTicketCount = (indicator: number) => {
    if (selectedTicket) {
      if (indicator === 1) {
        setSelectedTicket({
          ...selectedTicket,
          numberOfTickets: selectedTicket?.numberOfTickets + 1,
        })
      } else if (indicator === 0 && selectedTicket.numberOfTickets > 1) {
        setSelectedTicket({
          ...selectedTicket,
          numberOfTickets: selectedTicket?.numberOfTickets - 1,
        })
      }
    }
  }
  return (
    <Card x-chunk="dashboard-02-chunk-0" className="mx-4 my-4 md:mx-0">
      <CardHeader className="p-2 md:p-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        {points?.map((point, index) => (
          <div key={index} className="pb-2">
            <div className="flex items-center gap-2">
              <Ticket size={18} />
              <p className="text-sm">{point}</p>
            </div>
          </div>
        ))}
        {selectedTicket?.ticketId !== ticketId ? (
          <Button disabled={!disabled} onClick={() => onTicketSelected(ticketId)} size="sm" className="w-full">
            {disabled ? 'Select' : 'Not Available'}
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex p-2">
              <button onClick={() => updateTicketCount(0)} className="rounded-l-md bg-gray-800 p-2">
                <MinusIcon color="white" />
              </button>
              <p className="p-2 px-4 font-semibold">{selectedTicket?.numberOfTickets}</p>
              <button onClick={() => updateTicketCount(1)} className="rounded-r-md bg-gray-800 p-2">
                <PlusIcon color="white" />
              </button>
            </div>
            <div className="p-2">
              <button onClick={() => setSelectedTicket(undefined)} className="rounded-md bg-red-300 p-2">
                <TrashIcon color="white" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
