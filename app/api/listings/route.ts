import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'

import getCurrentUser from "@/app/actions/getCurrentUser";

  
export async function POST(request: Request){
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();

  const { title, description, price, imageSrc, category, roomCount, bathroomCount, guestCount, location} = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price,10),
      imageSrc,
      catergory: category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      userId: currentUser.id
    }
  })
  return NextResponse.json(listing);
}