import Image from 'next/image';
import logo from '../public/logo/NT_Logo.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl rounded-lg bg-surface px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 min-h-[600px]">
        <div>
          <aside className="flex w-full lg:w-5/12 items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={logo}
                alt="NT Logo"
                className="w-full sm:w-52 lg:w-64 h-auto"
                priority
              />
            </div>
          </aside>
        </div>
        <main className='flex flex-col items-end justify-center h-full w-2/2'>
          <h1 className="text-4xl font-bold text-center mb-6">Welcome to Kaifong!</h1>
          <p className="text-lg text-center mb-4">Your one-stop solution for community management.</p>
        </main>
      </div>
    </div>
  );
}