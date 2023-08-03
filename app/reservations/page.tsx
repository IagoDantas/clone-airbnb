import { EmptyState } from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import { ReservationsClient } from "./ReservationsClient"

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }


  const reservations = await getReservations({
    authorId: currentUser.id
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle="Looks like you haven't reservations on your properties"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient
        //@ts-ignore
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}