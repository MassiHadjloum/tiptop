"use client"

import { useSearchParams } from "next/navigation"
import CardWrapper from "./CardWrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/lib/actions/newVerification"
import FormMessage from "./FormMessage"

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token")
      return;
    };
    newVerification(token).then((data) => {
      setSuccess(data.success)
      setError(data.error);
    }).catch(() => setError("Something went wrong"))
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper headerLabel="Confirming your verification"
      backButtonHref="/sign-in"
      backButtonLabel="Back to login">
      <div className="flex w-full items-center justify-center">
        <BeatLoader />
        <FormMessage type="ERROR" message={error} />
        <FormMessage type="SUCCESS" message={success} />
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
