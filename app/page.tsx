import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 lg:p-16">
      <h1 className="text-4xl lg:text-6xl md:text-5xl font-extrabold text-center">Create Notes With Ease</h1>
      <p className="max-w-lg mt-6 text-base lg:text-xl text-center">Welcome to our Notes App! This is a user-friendly platform designed to make note-taking easier and more efficient.</p>
    </div>
  );
}
