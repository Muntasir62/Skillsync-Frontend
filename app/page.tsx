import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="bg-light min-h-screen flex flex-col">
      <header className="header bg-white">
        <h1 className="text-darker text-4xl font-bold">Welcome To SkillSync</h1>
        <Image
          src="/skillsync.jpg"
          width={300}
          height={300}
          alt="SkillSync Logo"
          className="mx-auto mt-6"
        />
      </header>
      
      <main className="container flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-darker mb-6">Get Started</h2>
          
          <div className="space-y-4">
            <Link href="/login" className="block">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg">
                Login
              </button>
            </Link>
            
            <Link href="/signup" className="block">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="footer mt-auto">
        <p>© 2023 SkillSync - Educational Platform</p>
      </footer>
    </div>
  );
}