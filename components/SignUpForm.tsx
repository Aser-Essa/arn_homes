"use client";
import React, { useState } from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaGoogle, FaFacebookF, FaSpinner } from "react-icons/fa6";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./ui/Icons";

export default function SignUpForm() {
  const [passValue, setPassValue] = useState("");
  const [passConfirmValue, setPassConfirmValue] = useState("");

  const [error, setError] = useState(false);

  const passwordsMatch =
    passValue && passConfirmValue && passValue === passConfirmValue;

  return (
    <div className="w-full px-5 py-6 sm:px-10 sm:py-10 lg:w-[53vw] lg:px-16">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start" className="space-y-9">
                <div className="space-y-2.5">
                  <p className="text-[clamp(26px,3vw,36px)] font-semibold lg:leading-[clamp(28px,3.2vw,44px)]">
                    Welcome to Arn Homes. <br className="" />
                    Sign up to enjoy much more
                  </p>
                  <div className="flex items-center">
                    <p>No account? </p>
                    <Button
                      variant="link"
                      asChild
                      className="px-2 text-base font-semibold text-scooter-700"
                    >
                      <Clerk.Link navigate="sign-in">Sign in</Clerk.Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-5">
                  <Clerk.Field name="emailAddress">
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
                      name="emailAddress"
                      className="mt-1.5 block text-sm font-medium text-red-400"
                    />
                  </Clerk.Field>

                  <Clerk.Field name="password">
                    <Clerk.Input
                      type="password"
                      placeholder="Password"
                      required
                      validatePassword
                      asChild
                      disabled={isGlobalLoading}
                    >
                      <Input
                        className="h-[50px] rounded-xl border-amber-100 !text-lg shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:border-amber-400 focus:outline-none"
                        onChange={(e) => setPassValue(e.target.value)}
                      />
                    </Clerk.Input>
                    <Clerk.FieldError
                      name="password"
                      className="mt-1.5 block text-sm font-medium text-red-400"
                    />
                  </Clerk.Field>

                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      disabled={isGlobalLoading}
                      onChange={(e) => {
                        setPassConfirmValue(e.target.value);
                        setError((prev) => prev && e.target.value != passValue);
                      }}
                      className="h-[50px] rounded-xl border-amber-100 !text-lg shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:border-amber-400 focus:outline-none"
                    />

                    {error && (
                      <p className="mt-1 text-sm font-medium text-red-600">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2.5">
                    <SignUp.Action submit asChild>
                      <Button
                        className={cn("h-[50px] w-full !text-base sm:!text-lg")}
                        disabled={error && passConfirmValue != passValue}
                        onClick={() => setError(!passwordsMatch)}
                      >
                        <Clerk.Loading>
                          {(isLoading) =>
                            isLoading ? <Icons.spinner /> : "Sign Up"
                          }
                        </Clerk.Loading>
                      </Button>
                    </SignUp.Action>
                    <p className="md:text-nowrap">
                      By signing up, you accept our{" "}
                      <Link
                        href={""}
                        className="font-semibold text-scooter-700"
                      >
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link
                        href={""}
                        className="font-semibold text-scooter-700"
                      >
                        Privacy Policy.
                      </Link>
                    </p>
                  </div>

                  <p className="text-muted-foreground flex items-center gap-x-[42px] font-medium before:h-px before:flex-1 before:bg-gray-100 after:h-px after:flex-1 after:bg-gray-100">
                    or continue with
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
                </div>
              </SignUp.Step>

              <div className="flex h-full w-full items-center justify-center">
                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>Verify your email</CardTitle>
                        <CardDescription>
                          Use the verification link sent to your email address
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-y-4">
                        <div className="grid items-center justify-center gap-y-2">
                          <Clerk.Field name="code" className="space-y-2">
                            <Clerk.Label className="sr-only">
                              Email address
                            </Clerk.Label>
                            <div className="flex justify-center text-center">
                              <Clerk.Input
                                type="otp"
                                className="flex justify-center has-[:disabled]:opacity-50"
                                autoSubmit
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className={cn(
                                        "border-input relative flex size-10 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                        {
                                          "ring-ring ring-offset-background z-10 ring-2":
                                            status === "cursor" ||
                                            status === "selected",
                                        },
                                      )}
                                    >
                                      {value}
                                      {status === "cursor" && (
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                          <div className="bg-foreground h-4 w-px animate-caret-blink duration-1000" />
                                        </div>
                                      )}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="text-destructive block text-center text-sm" />
                          </Clerk.Field>
                          <SignUp.Action
                            asChild
                            resend
                            className="text-muted-foreground"
                            fallback={({ resendableAfter }) => (
                              <Button variant="link" size="sm" disabled>
                                Didn&apos;t receive a code? Resend (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button type="button" variant="link" size="sm">
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignUp.Action>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignUp.Action submit asChild>
                            <Button disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <FaSpinner className="size-4 animate-spin" />
                                  ) : (
                                    "Continue"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignUp.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignUp.Strategy>
                </SignUp.Step>
              </div>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
