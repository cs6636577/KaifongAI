import Image from 'next/image';
import logo from '../public/logo/NT_Logo.png';
import kaifong from '../public/logo/Kaifong_logo.png';

export default function Home() {
  return (
    <div className="h-screen bg-accent flex items-center justify-center px-4 py-6">
      
      <div className="w-full max-w-5xl rounded-3xl bg-background p-6 sm:p-8 lg:p-10">
        
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <aside className="flex w-full lg:w-1/2 items-center justify-center">
            <Image
              src={logo}
              alt="NT Logo"
              className="w-40 sm:w-52 lg:w-72 xl:w-80 h-auto drop-shadow-lg"
              priority
            />
          </aside>

          <div className='w-full lg:w-1/2 rounded-3xl bg-surface p-8 sm:p-10 lg:p-12 flex items-center justify-center drop-shadow-lg'>
            <main className="flex w-full flex-col justify-center items-center">
              <div className="flex flex-row items-center justify-center gap-3 mb-8 w-full">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground3">
                  เข้าสู่ระบบ
                </h1>
                <Image src={kaifong} alt="Kaifong Logo" className="w-16 h-16 sm:w-20 sm:h-20"/>
              </div>
              <form className="w-full max-w-sm mx-auto">
                <div className="mb-5 relative flex items-center">
                  <span className="absolute left-4 text-gray-400 text-xl">👤</span>
                  <input className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:border-primary" id="username" type="text" placeholder="อีเมล / หมายเลขโทรศัพท์"/>
                </div>
                <div className="mb-8 relative flex items-center">
                  <span className="absolute left-4 text-gray-400 text-xl">🔒</span>
                  <input className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:border-primary" id="password" type="password" placeholder="รหัสผ่าน"/>
                </div>
                <div className='text-right mb-10'>
                  <a className="text-sm font-bold text-gray-700 hover:text-primary" href="#">
                    Forgot password
                  </a>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <button className="w-40 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors" type="button">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>

      </div>
    </div>
  );
}