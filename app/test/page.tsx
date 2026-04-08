"use client"

import { useState } from "react"
import Navbar from "../../components/ui/Admin_director/Navbar"
import Sidebar from "../../components/ui/Admin_director/Sidebar"

export default function Test() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-screen w-full bg-surface">
            <Sidebar isOpen={isOpen} />

            <Navbar
                isOpen={isOpen}
                onMenuClick={() => setIsOpen((prev) => !prev)}
            />

            <main
                className={`transition-all duration-300 p-6 ${
                    isOpen ? "ml-64" : "ml-0"
                }`}
            >
                เนื้อหาหลัก
            </main>
        </div>
    )
}