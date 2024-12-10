import axios from 'axios'
import { useEffect, useState } from 'react'

export const getTickets = () => {
  const [tickets, setTickets] = useState<Ticket[] | undefined>(undefined)
  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}tickets`)
        setTickets(response.data.tickets)
      } catch (error) {
        console.error(error)
      }
    }
    getTickets()
  }, [])
  return tickets
}
