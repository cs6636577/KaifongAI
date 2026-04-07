"use client"
import Image from "next/image"
import KaifongLogo from "../../../public/logo/Kaifong_logo2.png";
import { MdOutlineDashboard, MdSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbBook2 } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";

type SidebarProps = {
    isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside
            className={`fixed top-0 left-0 z-40 h-screen w-69 bg-foreground3 shadow-lg transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="flex flex-row px-6 py-2 mt-2">
                <div className="flex flex-col items-start">
                    <div className="h-10 flex items-start px-0 py-2 text-xl font-bold text-accent">
                        KAIGONG AI
                    </div>
                    <div className="h-10 flex items-start px-0 text-sm font-light text-white">
                        ระบบแจ้งเรื่องร้องทุกข์
                    </div>
                </div>
                {/* ภาพแตกจัดพี่จ๋า ได้โปรดทำไฟล์svgให้ข่อยแน๊*/}
                <div className="flex-row items-center justify-end ml-auto">
                    <Image src={KaifongLogo} alt="KaifongLogo" className="w-18 h-auto" />
                </div>
            </div>
            <hr className="border-gray-200 mx-5" />


            <div className="p-4 space-y-3 text-white text-xl">
                <div className="rounded-lg px-3 py-2 hover:bg-gray-100/10 cursor-pointer transition-all duration-200">
                    <div className="flex flex-row items-center justify-self-auto gap-3">
                        <span>
                            <MdOutlineDashboard size="24" />
                        </span>
                        <div>
                            แดชบอร์ด
                        </div>
                    </div>
                </div>
                <hr className="border-black/20 mx-1" />


                <div className="rounded-lg px-3 py-2 hover:bg-gray-100/10 cursor-pointer">
                    <div className="flex flex-row items-center justify-self-auto gap-3">
                        <span>
                            <FaRegUser size="24" />
                        </span>
                            <div>
                                สมาชิก
                            </div>
                        </div>
                    </div>
                <hr className="border-black/20 mx-1" />

                <div className="rounded-lg px-3 py-2 hover:bg-gray-100/10 cursor-pointer">
                    <div className="flex flex-row items-center justify-self-auto gap-3">
                        <span>
                            <TbBook2 size="24" />
                        </span>
                        <div>
                            คู่มือการใช้งาน
                        </div>
                    </div>
                </div>
                <hr className="border-black/20 mx-1" />

                <div className="rounded-lg px-3 py-2 hover:bg-gray-100/10 cursor-pointer">
                    <div className="flex flex-row items-center justify-self-auto gap-3">
                        <span>
                            <MdSettings size="24" />
                        </span>
                        <div>
                            ประเภทปัญหา
                        </div>
                    </div>
                </div>
                <hr className="border-black/20 mx-1" />
            </div>
        </aside>
    )
}