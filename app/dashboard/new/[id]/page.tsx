import { Submit } from "@/app/components/Submitbutton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

const bcrypt = require('bcrypt');

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
    noStore();
    const data = await prisma.note.findUnique({
        where: {
            id: noteId,
            userId: userId,
        },
        select: {
            resname: true,
            address: true,
            id: true,
            phone: true,
        },
    });

    return data;
}

export default async function DynamicRoute({
    params,
}: {
    params: { id: string };
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData({ userId: user?.id as string, noteId: params.id });

    async function postData(formData: FormData) {
        "use server";

        // if (!user) throw new Error("you are not allowed");

        if(user){

        const resname = formData.get("title") as string;
        const address = formData.get("description") as string;
        const phone = formData.get("phone") as string;

        // const encryptedDescription = await bcrypt.hash(description, 10);

        await prisma.note.update({
            where: {
                id: data?.id,
                userId: user.id,
            },
            data: {
                address: address,
                resname:  resname,
                phone: phone,
            },
        });

        revalidatePath("/dashboard");

        return redirect("/dashboard");
    }
    }
    return (
        <Card>
            <form action={postData}>
                <CardHeader>
                    <CardTitle>Edit Note</CardTitle>
                    <CardDescription>
                        Right here you can now edit your notes
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="gap-y-2 flex flex-col">
                        <Label>Resident</Label>
                        <Input
                            required
                            type="text"
                            name="title"
                            placeholder="Title for your note"
                            defaultValue={data?.resname}
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>Address</Label>
                        <Textarea
                            name="description"
                            placeholder="Describe your note as you want"
                            required
                            defaultValue={data?.address}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Phone</Label>
                        <Textarea
                            name="phone"
                            placeholder="Describe your note as you want"
                            required
                            defaultValue={data?.phone}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button asChild variant="destructive">
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <Submit />
                </CardFooter>
            </form>
        </Card>
    );
}