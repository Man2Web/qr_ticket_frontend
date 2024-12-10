import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PaymentForm from 'src/components/form'
import Tickets from 'src/components/tickets'

export default function Home() {
  const { t } = useTranslation('translation')
  const [progress, setProgress] = useState<number>(0)
  const [selectedTicket, setSelectedTicket] = useState<{ ticketId: string; numberOfTickets: number } | undefined>(
    undefined,
  )
  return (
    <section className="mx-auto max-w-[500px]">
      {progress === 0 && (
        <Tickets
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          progress={progress}
          setProgress={setProgress}
        />
      )}
      {progress === 1 && <PaymentForm selectedTicket={selectedTicket} setProgress={setProgress} />}
    </section>
  )
}
