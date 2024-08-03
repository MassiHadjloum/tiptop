"use client"

import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT_LOGIN } from '@/routes';
import {FcGoogle} from "react-icons/fc"
import { ImFacebook2 } from "react-icons/im";

const Social = () => {
  const [isPending, setTransition] = useTransition();
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT_LOGIN
    })
  }
  return (
    <>
      <div className='flex justify-center gap-x-2'>
        <Button
          // className="form-btn bg-des"
          className="w-full bg-cyan-500"
          type="button"
          size='lg'
          variant='destructive'
          onClick={() => onClick('google')}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp;
              Loading ...
            </>
          ) : (
            <FcGoogle size={25}/>
            // "Sign In with Google"
          )}
        </Button>
        <Button
          className="w-full bg-green-400"
          size='lg'
          // type="button"
          variant='destructive'
          onClick={() => onClick('facebook')}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp;
              Loading ...
            </>
          ) : (
            <ImFacebook2 size={25}/>
            // "Sign In with Facebook"
          )}
        </Button>
      </div>
    </>
  )
}

export default Social
