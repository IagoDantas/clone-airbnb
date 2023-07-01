'use client'

import Image from "next/image"

interface AvatarProps {
  src?: string | null | undefined;
}

export function Avatar({ src }: AvatarProps) {
  return (
    <Image alt="Avatar" src={src || "/images/placeholder.jpg"} className="rounded-full" height="30" width="30" />
  )
}