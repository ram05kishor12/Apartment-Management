"use client";
import Link from "next/link";
import { useEffect } from "react"; // Import useEffect hook
import { useRouter } from "next/navigation"; // Import useRouter hook
import { ThemeToggle } from "./themetoggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export function Navbar() {
    const { sessionId, isLoaded } = useAuth();
    const router = useRouter(); // Initialize useRouter

    // Use useEffect to check for sessionId changes
    // useEffect(() => {
    //     // Check if user is signed in and sessionId exists
    //     if (isLoaded && sessionId) {
    //         // Redirect to dashboard page
    //         router.push("/dashboard");
    //     }
    // }, [isLoaded, sessionId]); // Dependency array ensures this effect runs only when isLoaded or sessionId changes

    return (
        <div className="border-b border-gray-200 dark:border-gray-800 h-[10vh] p-3">
            <div className="flex items-center justify-between h-full px-1 mx-auto max-w-7xl">
                <Link href="/">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">NOTES <span className="text-primary"> EASE</span></p>
                </Link>
                <div className="flex items-center gap-10">
                    <ThemeToggle />
                    {isLoaded ? (
                        sessionId ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <div className="space-x-5">
                                <Link href="/sign-in">
                                    <Button>
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/sign-up">
                                    <Button variant={"secondary"}>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
}
