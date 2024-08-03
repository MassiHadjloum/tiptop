"use client"

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({ children, headerLabel, backButtonHref, backButtonLabel, showSocial }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-sm">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-3xl font-semibold")}></h1>
          <p className="text-muted-foreground text-sm">{headerLabel} </p>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <Button variant='link' asChild className="font-normal w-full" size="sm" >
          <Link href={backButtonHref} >
            {backButtonLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
