interface TicketProps {
  ticketId: string
  title: string
  description: string
  points: string[]
  disabled: boolean
  selectedTicket: { ticketId: string; numberOfTickets: number } | undefined
  setSelectedTicket: (data: { ticketId: string; numberOfTickets: number } | undefined) => void
}

interface Ticket {
  id: string
  name: string
  description: string
  points: string[]
  price: string
  tickets_left: string
  status: boolean
}
