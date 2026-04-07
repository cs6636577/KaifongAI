"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Admin_director/Navbar";
import Sidebar from "@/components/ui/Admin_director/Sidebar";

export default function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-surface">
        <Sidebar isOpen={isOpen} />

        <Navbar
            isOpen={isOpen}
            onMenuClick={() => setIsOpen((prev) => !prev)}
        />

        <main
            className={`pt-16 transition-all duration-300 ${
            isOpen ? "ml-[276px]" : "ml-0"
            }`}
        >
            {children}
        </main>
        </div>
    );
}