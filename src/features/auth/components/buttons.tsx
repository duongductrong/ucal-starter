import { Button, ButtonProps } from "@/components/ui/button"
import { BuiltInProviderType } from "next-auth/providers"
import { signInWithOAuth } from "../actions/sign-in"

export interface SignInWithProviderButtonProps extends ButtonProps {
  provider: BuiltInProviderType
}

export const SignInWithProviderButton = ({
  provider,
  children,
  ...props
}: SignInWithProviderButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      {...props}
      onClick={() => {
        signInWithOAuth(provider)
      }}
    >
      {children}
    </Button>
  )
}
