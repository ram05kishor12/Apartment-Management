import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export const Items = [
    {
        name: "Home", href: "/dashboard", icon: HomeIcon

    },
    {
        name: "Settings", href: "/settings", icon: SettingsIcon
    }

]
export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

        </div>
    )
}