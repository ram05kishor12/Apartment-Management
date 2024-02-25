import { ReactNode } from 'react';
import prisma from '../lib/db';
import Dashside from '../components/dashsidebar';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


async function getData({
    email,
    id,
    firstName,
    lastName,
    profileImage,
}: {
    email: string;
    id: string;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    profileImage: string | undefined | null;
}) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
        },
    });

    if (!user) {
        const name = `${firstName ?? ""} ${lastName ?? ""}`;
        await prisma.user.create({
            data: {
                id: id,
                email: email,
                name: name,
            },
        });
    }
}


export default async function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/");
    }
    await getData({
        email: user.email as string,
        firstName: user.given_name as string,
        id: user.id as string,
        lastName: user.family_name as string,
        profileImage: user.picture,
    }); {
        // Pass 'userId' directly to 'getData'
        return (
            <div className="flex flex-col space-y-6 mt-10">
                <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                    <aside className="hidden w-[200px] flex-col md:flex">
                        <Dashside />
                    </aside>
                    <main>{children}</main>
                </div>
            </div>
        );
    }
}
