import Image from "next/image";

export default function TopMenu() {
  return (
    <nav className="sticky top-0 w-full bg-white shadow z-50">
      <div className="flex justify-end items-center h-16 px-6">
        <div className="flex flex-col items-end">
          <span className="mr-4 text-gray-800 font-semibold">John Doe</span>
          <span className="mr-4 text-gray-500">Software Engineer</span>
        </div>
        <Image
          width={40}
          height={40}
          src="/profile.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </nav>
  );
}
