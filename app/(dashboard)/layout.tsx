import { ReactNode } from 'react';
import Dashboard from '../components/dashsidebar';
import DashSide from '../components/dashsidebar';
import prisma from '../lib/db';
import { auth } from '@clerk/nextjs';

async function getData(userId: any) { // Modify the function signature to accept 'userId'
    if (!userId.email) {
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userId.email,
        },
        select: {
            id: true,
        },
    });

    if (!user) {
        const name = `${userId.firstName ?? ""} ${userId.lastName ?? ""}`;
        await prisma.user.create({
            data: {
                id: userId.id,
                email: userId.email,
                name: name,
            },
        });
    }
}

export default async function Layout({ children }: { children: ReactNode }) {
    // const userId = auth().user;

    // if (!userId) {
    //     return null;
    // }

    // await getData(userId); // Pass 'userId' directly to 'getData'
    return (
        <div className="flex flex-col space-y-6 mt-10">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashSide />
                </aside>
                <main>{children}</main>
            </div>
        </div>
    );
}
