'use client'

import Image from "next/image"

export function Avatar() {
  return (
    <Image alt="Avatar" src="/images/placeholder.jpg" className="rounded-full" height="30" width="30" />
  )
}