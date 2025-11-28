"use client";

import React, { useState } from "react";
import {
  Home,
  User,
  Briefcase,
  Bookmark,
  Settings,
  LogOut,
  Bird,
  Menu,
  X,
} from "lucide-react";

interface SideMenuItems {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

export default function SideMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Accueil");

  const links: SideMenuItems[] = [
    { label: "Accueil", icon: Home },
    { label: "Profil", icon: User },
    { label: "Offres d’emploi", icon: Briefcase },
    { label: "Candidatures", icon: Bookmark },
  ];

  const bottomLinks: SideMenuItems[] = [
    { label: "Paramètres", icon: Settings },
    { label: "Se déconnecter", icon: LogOut },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full">
      <button
        className="lg:hidden fixed top-4 right-4 z-[101] p-2 rounded-md bg-violet-600 text-white shadow-md transition-all duration-300 cursor-pointer"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-[100] p-4 flex flex-col justify-between shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:shadow-none lg:p-4 lg:h-full lg:w-64`}
      >
        <nav>
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="bg-violet-600 rounded-full p-2">
              <Bird size={28} color="white" />
            </div>
            <div className="text-2xl font-bold">
              Meet<span className="text-violet-600">Work</span>
            </div>
          </div>
          <ul className="list-none pt-4 m-0">
            {links.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className={`py-4 flex items-center gap-2 cursor-pointer rounded-md px-2 relative transition-all duration-200
                  hover:bg-violet-50
                  ${active === label ? "text-violet-700" : ""}
                `}
                onClick={() => setActive(label)}
              >
                <Icon size={20} />
                {label}
                {active === label && (
                  <span className="absolute right-0 top-2 bottom-2 w-1 rounded bg-violet-600 transition-all duration-300" />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <ul className="list-none pb-6 m-0">
            {bottomLinks.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className={`py-4 flex items-center gap-2 cursor-pointer rounded-md px-2 relative transition-all duration-200
                  hover:bg-violet-50
                  ${active === label ? "text-violet-700" : ""}
                `}
                onClick={() => setActive(label)}
              >
                <Icon size={20} />
                {label}
                {active === label && (
                  <span className="absolute right-0 top-2 bottom-2 w-1 rounded bg-violet-600 transition-all duration-300" />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
