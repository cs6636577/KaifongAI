import Link from "next/link"
import DataTable from "@/components/ui/Admin_director/DataTableBase"
import { Complaint } from "../../evaluate/table/complain"
import PersonCell from "./personCell"
import PhoneCell from "./phoneCell"
import StatusBadge from "./statusBadge"
import StaffCell from "./staffCell"
import ChannelBadge from "./chanelBadge"


type Props = {
  columns: { key: string; title: string }[]
  data: Complaint[]
}

export default function ComplaintTable({ columns, data }: Props) {
  return (
    <div className="rounded-xl border border-[#EAEDFF] overflow-hidden mx-12 mt-10">
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          theadClassName="text-[#64748B] text-sm bg-foreground3 text-white h-16"
        >
          <tbody className="text-sm text-secondary">
            {data.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 h-20 hover:bg-gray-50">
                <td className="px-6 py-4 text-[#575E72]">{row.id}</td>

                <td className="px-6 py-4 text-[#725C00]">
                  <Link href={`/admin/complaints/${row.id}`} className="hover:underline">
                    {row.problems}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <ChannelBadge app={row.app} />
                </td>

                <td className="px-6 py-4 font-bold text-secondary">
                  <Link href={`/admin/complaints/${row.id}`} className="hover:underline">
                    {row.title}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <PersonCell person={row.person} />
                </td>

                <td className="px-6 py-4">
                  <PhoneCell phone={row.phone} />
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={row.status} />
                </td>

                <td className="px-6 py-4">
                  <StaffCell staff={row.staff} />
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  )
}