import Link from "next/link";

import ThemeSwitch from "@/components/global/ThemeSwitch";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="h-screen grid place-items-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Welcome !</CardTitle>
          <CardDescription>
            You Can chnage the theme by clicking on the button below or go to
            Login page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSwitch />
          <Link href="/login" className={cn(buttonVariants(), "mt-4 w-full")}>
            Login
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
