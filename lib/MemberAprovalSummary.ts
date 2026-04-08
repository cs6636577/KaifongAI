import { getData } from "../services/DataProvider"; 
import { DashboardData } from "../services/DataProvider";
//สำหรับส่งค่าไปที่ front เพื่อแสดงผล
interface SummaryItem{
        title: string ;
        value: number ;
        subvalue?: string | number ;
        color?: string ;
}
