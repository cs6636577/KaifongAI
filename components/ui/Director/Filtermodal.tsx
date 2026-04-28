type Props = {
  isOpen: boolean
  onClose: () => void
  options: string[]
  selected: string[]
  setSelected: (value: string[]) => void
}

export default function EvaluateFilterModal({
  isOpen,
  onClose,
  options,
  selected,
  setSelected,
}: Props) {
  if (!isOpen) return null

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">กรองสถานะ</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {options.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selected.includes(status)}
                onChange={() => toggle(status)}
              />
              {status}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setSelected([])}
            className="text-gray-500"
          >
            ล้าง
          </button>

          <button
            onClick={onClose}
            className="bg-[#FFD100] px-4 py-2 rounded-xl font-bold"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  )
}