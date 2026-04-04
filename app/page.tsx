import Image from 'next/image';
import logo from '../public/logo/NT_Logo.png';

export default function Home() {
  return (
    <div className="h-screen bg-accent flex items-center justify-center px-4 py-6">
      
      <div className="w-full max-w-5xl rounded-3xl bg-surface p-6 sm:p-8 lg:p-10 h-[600px]">
        
        <div className="flex h-full flex-col lg:flex-row">
          <aside className="flex w-full lg:w-5/12 items-center justify-center">
            <Image
              src={logo}
              alt="NT Logo"
              className="w-40 sm:w-52 lg:w-72 xl:w-80 h-auto"
              priority
            />
          </aside>

          <main className="flex w-full lg:w-7/12 flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              Welcome to Kaifong!
            </h1>
            <p className="text-base sm:text-lg">
              Your one-stop solution for community management.
            </p>
          </main>

        </div>

      </div>
    </div>
  );
}