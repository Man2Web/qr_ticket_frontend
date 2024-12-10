import { getTickets } from 'src/hooks/getTickets'
import TicketCard from '../card/card'
import { Button } from '../ui/button'

const Tickets = ({
  selectedTicket,
  setSelectedTicket,
  progress,
  setProgress,
}: {
  selectedTicket: { ticketId: string; numberOfTickets: number } | undefined
  setSelectedTicket: (data: { ticketId: string; numberOfTickets: number } | undefined) => void
  progress: number
  setProgress: (data: number) => void
}) => {
  const tickets = getTickets()
  return (
    <div className="mb-16">
      {tickets?.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticketId={ticket.id}
          title={ticket.name}
          disabled={ticket.status}
          description={ticket.description}
          points={ticket.points}
          setSelectedTicket={setSelectedTicket}
          selectedTicket={selectedTicket}
        />
      ))}
      {selectedTicket && progress === 0 && (
        <div className="fixed bottom-0 z-10 w-full max-w-[500px] rounded-t-md bg-gray-100 px-2 py-4">
          <Button onClick={() => setProgress(1)} className="w-full">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default Tickets
