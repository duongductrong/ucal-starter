"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Field from "@/components/usecases/form"
import { cn } from "@/utils/tw"
import { BuiltInProviderType } from "next-auth/providers/index"
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form"
import {
  signInWithCredentials,
  signInWithOAuth,
} from "../actions/sign-in-with-oauth"

export interface Credentials {
  email: string
  password: string
}

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const methods = useForm<{
    email: string
    password: string
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSignInWithProvider = (provider: BuiltInProviderType) => () => {
    signInWithOAuth(provider)
  }

  const handleSignInWithCredentials = methods.handleSubmit((data) => {
    signInWithCredentials(data.email, data.password)
  })

  return (
    <FormProvider {...methods}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome </CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignInWithCredentials}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSignInWithProvider("apple")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Apple
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSignInWithProvider("google")}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 488 512"
                      height="200px"
                      width="200px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Field
                      component="text"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      label="Email"
                      required
                      tabIndex={1}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        tabIndex={0}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Field
                      component="text"
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      tabIndex={2}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </FormProvider>
  )
}
