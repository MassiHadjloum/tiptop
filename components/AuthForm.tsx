"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomInput from "./CustomInput";
import { Login, Register } from "@/lib/actions/auth.action";
import FormMessage from "./FormMessage";
import { db } from "@/lib/prisma";
import Social from "./Social";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
  ? "Email already in use with another provider" : ""
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-in") {
        setTransition(() => {
          Login(data).then((data) => {
            setMessage({
              error: data?.error ?? "",
              success: data?.success ?? "",
            });
          });
        });
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
      if (type === "sign-up") {
        setTransition(() => {
          Register(data).then((data) => {
            setMessage({
              error: data.error ?? "",
              success: data.success ?? "",
            });
          });
        });
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
        // if (response) {
        //   console.log("========= ", response);
        //   router.push("/");
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign Up" : "Sign In"}{" "}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}{" "}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4 ">........</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      label="First Name"
                      placeholder="Enter your first name"
                      control={form.control}
                      name="firstName"
                    />
                    <CustomInput
                      label="Last Name"
                      placeholder="Enter your last name"
                      control={form.control}
                      name="lastName"
                    />
                  </div>
                  <CustomInput
                      label="User name"
                      placeholder="Enter your user Name"
                      control={form.control}
                      name="userName"
                    />
                  <div className="flex gap-4">
                    <CustomInput
                      label="Phone number"
                      placeholder="Enter your phone number"
                      control={form.control}
                      name="phoneNumber"
                    />
                    <CustomInput
                      label="Date of birth"
                      placeholder="Enter your Date of birth"
                      control={form.control}
                      name="dateOfBirth"
                      type="date"
                    />
                  </div>
                  
                </>
              )}
              <CustomInput
                label="Email"
                placeholder="Enter your email"
                control={form.control}
                name="email"
              />
              <CustomInput
                label="Password"
                placeholder="Enter your password"
                control={form.control}
                name="password"
                type="password"
              />
              <FormMessage message={message.error || urlError} type="ERROR" />
              <FormMessage message={message.success} type="SUCCESS" />
              <div className="flex justify-center flex-col gap-4">
                <Button
                  className="form-btn bg-des"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
              {/* <div className="flex justify-center flex-col gap-4">
                <Button
                  className="form-btn bg-des"
                  type="button"
                  onClick={() => {}}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading ...
                    </>
                  ) : (
                    type === "sign-in" && "Sign In with Google"
                  )}
                </Button>
              </div> */}
              <Social />
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Dont't have an account ?"
                : "Already have an account ?"}{" "}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
