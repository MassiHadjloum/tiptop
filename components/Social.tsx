"use client"

import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT_LOGIN } from '@/routes';

const Social = () => {
  const [isPending, setTransition] = useTransition();
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT_LOGIN
    })
  }
  return (
    <>
      <div className='flex justify-center flex-col gap-4'>
        <Button
          className="form-btn bg-des"
          type="button"
          onClick={() => onClick('google')}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp;
              Loading ...
            </>
          ) : (
            "Sign In with Google"
          )}
        </Button>
      </div>
      <div className='flex justify-center flex-col gap-4'>
        <Button
          className="form-btn bg-des"
          type="button"
          onClick={() => onClick('facebook')}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp;
              Loading ...
            </>
          ) : (
            "Sign In with Facebook"
          )}
        </Button>
      </div>
    </>
  )
}

export default Social
