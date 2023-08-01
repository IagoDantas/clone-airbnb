import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import { EmptyState } from "@/app/components/EmptyState";
import { ListingClient } from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

async function ListingPage({ params }: { params: IParams }) {

  const listing = await getListingById(params);
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        //@ts-ignore
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage;