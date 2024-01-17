"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function GoogleLogin() {
  return (
    <Button
      variant="accent"
      onClick={() => {
        void signIn("google");
      }}
    >
      Signin with Google
    </Button>
  );
}
