import Link from "next/link";
import { ThemeToggle } from "./themetoggle";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function Navbar() {
    const { isAuthenticated } = getKindeServerSession();
    return (
        <div className="border-b border-gray-200 dark:border-gray-800 h-[10vh]">
            <div className="flex items-center justify-between h-full px-4 mx-auto max-w-7xl">
                <Link href="/">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">RAMKISHOR</p>
                </Link>
                <div className="flex items-center gap-5">
                    <ThemeToggle />
                    {(await isAuthenticated()) ? (
                        <Button>
                            Logout
                        </Button>
                    ) : (
                        <div>
                            <LoginLink>
                                <Button>
                                    Sign In
                                </Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button variant={"secondary"}>
                                    Sign Up
                                </Button>
                            </RegisterLink>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}