import { MdOutlineGridView } from "react-icons/md"
import ComplaintSearchInput from "../Admin_director/ComplainSearchInput"
import SearchInput from "./SearchInput"
import { FaList } from "react-icons/fa6"

const ChevronDown = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export default function ManualToolbar() {
  return (
<div className="w-full rounded-2xl bg-[#E6E8F0] p-4">
  <div className="flex items-center gap-4 w-full">

<div className="flex-1">
  <SearchInput
    className="w-full"
    inputClassName="rounded-2xl py-3.5"
    placeholder="ค้นหาคู่มือหรือวิดีโอที่แนะนำ..."
  />
</div>

    {/* dropdown */}
    <div className="flex items-center justify-between rounded-xl bg-white px-6 py-3.5 text-gray-500 min-w-[160px]">
      <span></span>
      <ChevronDown />
    </div>

    <div className="flex items-center justify-between rounded-xl bg-white px-6 py-3.5 text-gray-500 min-w-[160px]">
      <span></span>
      <ChevronDown />
    </div>

    {/* toggle */}
    <div className="flex items-center rounded-xl bg-[#D9DCE8] p-1 gap-1">
      <button className="rounded-lg bg-white p-3">
        <MdOutlineGridView  className="text-[#7A5C00]" />
      </button>
      <button className="rounded-lg p-2">
        <FaList className="text-gray-500" />
      </button>
    </div>

  </div>
</div>
  )
}