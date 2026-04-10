import { MdOutlineEdit } from "react-icons/md";

export default function EditButton() {
  return (
    <button className="p-2 rounded-3xl hover:bg-gray-100 transition cursor-pointer">
      <MdOutlineEdit className="w-6 h-6" />
    </button>
  );
}