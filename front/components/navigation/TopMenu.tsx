import { Search } from "lucide-react";

export default function TopMenu() {
  return (
    <nav className="w-full flex flex-row flex-wrap justify-between items-center pt-8 pb-6 px-4">
      <div className="flex flex-col">
        <span className="mr-4 text-gray-500">Hi John Doe,</span>
        <span className="mr-4 text-gray-800 text-2xl font-bold">Welcome to MeetWork !</span>
      </div>
      <div className="hidden lg:flex items-center w-1/2 max-w-sm bg-white rounded-lg px-4 py-3">
        <Search size={15} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none border-none text-sm"
        />
      </div>
    </nav>
  );
}
