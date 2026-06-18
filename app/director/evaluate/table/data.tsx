import { Complaint } from "./complain"
import mockData from "../../../../data/mock_data_may2026_fixed.json"

const statuses = mockData.meta.reference_ids.statuses
const staffUsers = mockData.meta.reference_ids.staff_users
const categories = mockData.meta.reference_ids.categories

const getStatusName = (
  statusId: string
): "รอดำเนินการ" | "กำลังดำเนินการ" | "เสร็จสิ้น" | "พักงาน" | "ถูกปฏิเสธ" => {
  const status = statuses.find((s) => s.status_id === statusId)

  if (status?.name === "เปิด") return "รอดำเนินการ"
  if (status?.name === "กำลังดำเนินการ") return "กำลังดำเนินการ"
  if (status?.name === "ปิด") return "เสร็จสิ้น"
  if (status?.name === "แก้ไขแล้ว") return "เสร็จสิ้น"
  if (status?.name === "พักงาน") return "พักงาน"
  if (status?.name === "ถูกปฏิเสธ") return "ถูกปฏิเสธ"

  return "รอดำเนินการ"
}
const getStaffName = (staffId: string) => {
  return staffUsers.find((s) => s.user_id === staffId)?.display_name || "-"
}
const getCategoryName = (categoryId: string) => {
  return categories.find((c) => c.category_id === categoryId)?.name || "-"
}
const getChannel = (channel: string) => {
  if (channel === "LINE") return "Line"
  if (channel === "WEB") return "Web"
  return "App"
}

export const complaints: Complaint[] = mockData.complaints.map((item, index) => ({
  id: String(index + 1),
  problems: item.complaint_no,
  app: getChannel(item.source_channel_detail),
  title: item.title,
  person: item.citizen_name,
  phone: item.citizen_phone,
  status: getStatusName(item.current_status_id),
  staff: getStaffName(item.assigned_user_id),
  types: getCategoryName(item.category_id),

}))
