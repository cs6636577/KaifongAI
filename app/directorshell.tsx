"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Admin_director/AdminNavbar";
import DirectorSidebar from "@/components/ui/Admin_director/DirectorSidebar";

export default function DirectorShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-surface">
      <DirectorSidebar isOpen={isOpen} />
      <Navbar
        isOpen={isOpen}
        onMenuClick={() => setIsOpen((prev) => !prev)}
        role="director"
      />
      <main className={`pt-16 transition-all duration-300 ${isOpen ? "ml-[276px]" : "ml-0"}`}>
        {children}
      </main>
    </div>
  );
}