"use client";
import React from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";
import { Icons } from "./ui/Icons";

export default function SignInForm() {
  return (
    <div className="lgpx-16 w-full px-5 py-6 sm:px-10 sm:py-10 lg:w-[53vw]">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start" className="space-y-10">
                <div className="space-y-2.5">
                  <p className="text-[clamp(26px,3vw,36px)] font-semibold xl:leading-none">
                    Welcome to Arn Homes.
                    <br /> Sign in to enjoy much more{" "}
                  </p>
                  <div className="flex items-center">
                    <p>No account? </p>
                    <Button
                      variant="link"
                      asChild
                      className="px-2 text-base font-semibold text-scooter-700"
                    >
                      <Clerk.Link navigate="sign-up">Sign up</Clerk.Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-5">
                  <Clerk.Field name="identifier">
                    <Clerk.Input
                      type="email"
                      placeholder="Email"
                      required
                      asChild
                      disabled={isGlobalLoading}
                    >
                      <Input className="h-[50px] rounded-xl border-amber-100 !text-lg shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:border-amber-400 focus:outline-none" />
                    </Clerk.Input>
                    <Clerk.FieldError
                      name="identifier"
                      className="mt-1.5 block text-sm font-medium text-red-400"
                    />
                  </Clerk.Field>

                  <Clerk.Field name="password">
                    <Clerk.Input
                      type="password"
                      placeholder="Password"
                      required
                      asChild
                      disabled={isGlobalLoading}
                    >
                      <Input className="h-[50px] rounded-xl border-amber-100 !text-lg shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:border-amber-400 focus:outline-none" />
                    </Clerk.Input>
                    <Clerk.FieldError
                      name="password"
                      className="mt-1.5 block text-sm font-medium text-red-400"
                    />
                  </Clerk.Field>

                  <SignIn.Action
                    navigate="forgot-password"
                    className="font-medium"
                  >
                    Forgot password?
                  </SignIn.Action>
                </div>

                <SignIn.Action submit asChild>
                  <Button className="h-[50px] w-full">Continue</Button>
                </SignIn.Action>

                <p className="text-muted-foreground flex items-center gap-x-[42px] font-medium before:h-px before:flex-1 before:bg-gray-100 after:h-px after:flex-1 after:bg-gray-100">
                  or sign in with
                </p>
                <div className="flex items-center justify-center gap-8 md:gap-16">
                  <Clerk.Connection name="google">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-600 p-3 transition-all hover:bg-amber-50">
                      <Clerk.Loading scope="provider:google">
                        {(isLoading) =>
                          isLoading ? (
                            <Icons.spinner />
                          ) : (
                            <FaGoogle className="h-6 w-6" />
                          )
                        }
                      </Clerk.Loading>
                    </div>
                  </Clerk.Connection>

                  <Clerk.Connection name="facebook">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-600 p-3 transition-all hover:bg-amber-50">
                      <Clerk.Loading scope="provider:facebook">
                        {(isLoading) =>
                          isLoading ? (
                            <Icons.spinner />
                          ) : (
                            <FaFacebookF className="h-6 w-6" />
                          )
                        }
                      </Clerk.Loading>
                    </div>
                  </Clerk.Connection>
                </div>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
