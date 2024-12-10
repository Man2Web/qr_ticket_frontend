import axios from 'axios'
import { useEffect, useState } from 'react'

export const getTicketData = (ticketId: string | undefined) => {
  const [ticketData, setTicketData] = useState<Ticket | undefined>(undefined)
  useEffect(() => {
    const getData = async (ticketId: string) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}tickets/get`, {
          params: {
            id: ticketId,
          },
        })
        setTicketData(response.data.ticket)
      } catch (error) {
        console.error(error)
      }
    }
    if (ticketId) {
      getData(ticketId)
    }
  }, [ticketId])
  return ticketData
}
