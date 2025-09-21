'use client'
import { useRouter } from "next/navigation";


export default function Home() {
    const navigate = useRouter();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className='flex gap-4 w-full justify-center items-center'>
                <button
                    className="w-full py-2 px-4 text-white rounded bg-green-400 transition-colors cursor-pointer"
                    onClick={() => navigate.push("/book")}
                >
                    Search Vehicle
                </button>
                <button
                    className="w-full py-2 px-4 text-white rounded bg-blue-400 transition-colors cursor-pointer"
                    onClick={() => navigate.push("/add-vehicle")}
                >
                    Add Vehicle
                </button>
            </div>
    </div>
  );
}
