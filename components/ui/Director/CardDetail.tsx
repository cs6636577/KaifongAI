import React from 'react'
import { BsChatLeftText } from 'react-icons/bs'
import { GrDocumentText } from 'react-icons/gr'
import { MdOutlinePictureAsPdf } from 'react-icons/md'

const CardDetail = () => {
  return (
    <div className="flex flex-col">
        <div className='bg-secondary px-8 py-3 w-full text-xl text-white flex flex-row mt-3 justify-start items-center rounded-t-xl'>
            <span>
                <GrDocumentText color="#FFD100"/>
            </span>
            <span className = "mx-4">
                ข้อมูลคำร้อง
            </span>
            <span className='text-sm flex flex-row items-center px-2 bg-green-500 rounded-full py-1.5 ml-auto'>
                <span className='pl-3'>
                    <BsChatLeftText />
                </span>
                <span className='mx-2 mt-1'>
                    LINE Official
                </span>
            </span>
        </div>

        <div className='bg-white w-full border-gray-300/30 border-1 rounded-b-xl grid grid-cols-2'>
            <div className="p-8">
                {/* left */}
                <div>
                    <p className="text-sm font-semibold text-gray-500">หัวข้อเรื่อง</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-800 leading-snug">
                        ขัดข้องเกี่ยวกับการเชื่อมต่อเครือข่ายภายในอาคาร 2
                    </h3>
                </div>

                <div className='mt-8'>
                    <p className="text-sm font-semibold text-gray-500">รายละเอียดปัญหา</p>
                    <p className="mt-2 text-lg leading-9 text-slate-800">
                        พบปัญหาอินเทอร์เน็ตไม่สามารถใช้งานได้...
                    </p>
                </div>
            </div>

            {/* right */}
            <div className="p-8">
                <div>
                    <p className="text-sm font-semibold text-gray-500">ประเภทบริการ</p>
                    <h3 className="mt-2 text-lg font-semibold leading-9 text-slate-800">
                        โครงสร้างพื้นฐานดิจิทัล (Network)
                    </h3>
                </div>

                <div className='mt-4'>
                    <p className="text-sm font-semibold text-gray-500">อุปกรณ์ที่เกี่ยวข้อง</p>
                    <p className="mt-2 text-lg font-semibold leading-9 text-slate-800">
                        Router / Access Point (ID: AP- 204-02)
                    </p>
                </div>
            </div>

            {/* file */}
            <div className='mt-12 p-2 px-8'>
                <p className="text-sm font-semibold text-gray-500">ไฟล์แนบเพิ่มเติม</p>
                <div className='flex flex-row gap-3'>
                    {/* file1 */}
                    <div className="mt-4 gap-4">
                        <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 px-5 py-4">
                            <span>
                                <MdOutlinePictureAsPdf />
                            </span>
                            <span className="font-semibold text-slate-800">
                                screenshot_issue_01.jpg
                            </span>
                        </div>
                    </div>
                    {/* file2 */}
                    <div className="mt-4 gap-4">
                        <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 px-5 py-4">
                            <span>
                                <MdOutlinePictureAsPdf />
                            </span>
                            <span className="font-semibold text-slate-800">
                                screenshot_issue_01.jpg
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetail
