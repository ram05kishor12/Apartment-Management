import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center p-3">
            <SignUp />
        </div>
    );
}