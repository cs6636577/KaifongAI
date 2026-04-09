"use client"
import React from 'react'
import EmojiButton from '@/components/ui/Director/EmojiButton'
import EmojiButton2 from '@/components/ui/Director/EmojiButton2'
import ComplaintSearchInput from '@/components/ui/Admin_director/ComplainSearchInput'
import { RiDropdownList } from 'react-icons/ri'
import ManualToolbar from '@/components/ui/Director/ManualToolbar'
import ComplaintPagination from '@/components/ui/Admin_director/PageNavigation'
import FileCard from '@/components/ui/Director/fileCard'

const StaffManualPage = () => {
    const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <div className="min-h-screen bg-background flex  justify-center">
        <div className="max-w-7xl mx-3 px-6 sm:px-6 lg:px-8 py-8 w-full">
            <h1 className="text-3xl font-bold text-secondary mb-7">คู่มือการใช้งาน</h1>
            <p className="text-lg text-muted-foreground mb-12 -mt-4">เอกสารสำหรับผู้ใช้งานระบบ KaiFongAI</p>

            <div className="flex gap-5">
                <EmojiButton/>
                <EmojiButton2/>
            </div>

            <div className='mt-8'>
                <ManualToolbar/>
            </div>

            <div>
                <FileCard/>
            </div>

            <div>
                <ComplaintPagination
                    currentPage={1}
                    totalPages={3}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    </div>
  )
}

export default StaffManualPage
