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
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

const bcrypt = require('bcrypt');

export default async function NewNoteRoute() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    async function postData(formData: FormData) {
        "use server";

        // if (!user) {
        //     throw new Error("Not authorized");
        // }

        if (user) {
            const resname = formData.get("resname") as string;
            const familymembers = formData.get("familymembers") as string;
            const address = formData.get("address") as string;
            const phone = formData.get("phone") as string;
            const proof = formData.get("proof") as string;

            // const encryptedDescription = await bcrypt.hash(description, 10)

            await prisma.note.create({
                data: {

                    userId: user?.id as string,
                    resname: resname,
                    familymembers: familymembers,
                    address: address,
                    phone: phone,
                    proof : proof
                },
            });
            
            return redirect("/dashboard");

    
        }
    }
    return (
        <Card>
            <form action={postData}>
                <CardHeader>
                    <CardTitle>New Resident</CardTitle>
                    <CardDescription>
                        Add a new resident to your building
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="gap-y-2 flex flex-col">
                        <Label>Name of Resident</Label>
                        <Input
                            required
                            type="text"
                            name="resname"
                            placeholder="Resident Name"
                        />
                    </div>

                    <div className="gap-y-2 flex flex-col">
                        <Label>Number of family members</Label>
                        <Input
                            required
                            type="text"
                            name="familymembers"
                            placeholder="Family members"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Address</Label>
                        <Textarea
                            name="address"
                            placeholder="Enter address"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Identity Proof</Label>
                        <Input
                            type="text"
                            name="proof"
                            placeholder="Enter identity proof details"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Phone</Label>
                        <Input
                            name="phone"
                            placeholder="Phone number"
                            required
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