export default function SideMenu() {
  return (
    <aside className="hidden lg:block w-46 xl:w-64 bg-white fixed z-100 shadow-md top-0 left-0 h-full p-4 border-r">
      <nav>
        <ul className="list-none pt-6 m-0">
          <li className="py-4">Dashboard</li>
          <li className="py-4">Job Listing</li>
          <li className="py-4">Saved Candidatures</li>
        </ul>
      </nav>
      <nav>
        <ul className="list-none pb-6 m-0">
          <li className="py-4">Settings</li>
          <li className="py-4">Help and Support</li>
        </ul>
      </nav>
    </aside>
  );
}
