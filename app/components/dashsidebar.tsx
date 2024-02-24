"use client";
import { cn } from "@/lib/utils";
import { Navbar } from "../components/navbar";
import { HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Items = [
    {
        name: "Home", href: "/dashboard", icon: HomeIcon

    },
    {
        name: "Settings", href: "/settings", icon: SettingsIcon
    }

]
export default function Dash() {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <nav className="flex flex-col items-start gap-2 py-5">
            {Items.map((item) => (
                <Link href={item.href} key={item.name}>
                    <span className={cn(
                        "group flex items-center rounded-md text-md py-3 px-8  font-bold space-x-5 hover:bg-accent hover:text-foreground", // Adjusted padding here
                        pathname === item.href ? "bg-accent" : "bg-transparent"
                    )}>
                        <item.icon className="w-5 h-5 text-primary" />
                        <span>{item.name}</span>
                    </span>
                </Link>
            ))}
        </nav>
    )
}
