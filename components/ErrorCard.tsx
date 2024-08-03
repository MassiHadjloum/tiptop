import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const ErrorCard = () => {
  return (
    <Card className='w-[400px] shadow-md flex flex-col justify-center items-center'>
        <Image
          src="/icons/bio.png"
          width={34}
          height={34}
          alt="The tip top logo"
          className="size-[24px] mt-2 max-xl:size-14"
        />
      <CardHeader>
        <Label className='font-normal text-gray-600 text-xl'>Something went wrong !!</Label>
      </CardHeader>
      <CardFooter>
        <Button variant='outline'>
          <Link href={'/sign-in'} >
            Back to login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ErrorCard
