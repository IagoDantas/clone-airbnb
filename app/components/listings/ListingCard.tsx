'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns'
import Image from "next/image";
import { da } from "date-fns/locale";
import { HeartButton } from "../HeartButton";
import { Button } from "../Button";


interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  currentUser?: SafeUser | null,
  disabled?: boolean,
  actionLabel?: string,
  actionId?: string,
}


export function ListingCard({ data, reservation, onAction, actionId = '', actionLabel, currentUser, disabled }: ListingCardProps) {

  const router = useRouter()
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId])

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    else {
      return data.price
    }
  }, [data.price, reservation])


  const reservationDate = useMemo(() => {

    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])


  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div
        className="flex flex-col gap-2 w-full"
      >
        <div
          className="aspect-square w-full relative overflow-hidden rounded-xl"
        >
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />


          <div
            className="absolute top-3 right-3"
          >
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region},{''}{location?.label}
        </div>
        <div
          className="font-light text-neutral-500"
        >
          {reservationDate || data.catergory}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold text-lg">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}