import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SimpleDropDown() {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <Select
        defaultValue=""
        displayEmpty
        sx={{
          borderRadius: 2,            
          backgroundColor: "#FAF8FF", 
          "& .MuiSelect-select": {
            fontStyle: "normal",      
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(209, 198, 171, 0.3)", // ขอบเทาเวลา focus
          },
          "& fieldset": {
            borderColor: "rgba(209, 198, 171, 0.3)", // ขอบเทาตอนปกติ
          },
            minWidth: 200, // กว้างเท่ากับตัว input
          "& .MuiInputBase-root": {
            height: 44, // ประมาณ py-3 ของ Tailwind
            borderRadius: "1rem", // rounded-xl
          },
          "& .MuiSelect-select": {
            paddingTop: "12px", // ปรับ padding ให้เหมือน input
            paddingBottom: "12px",
            paddingLeft: "24px", // เว้นให้ icon
        },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 2,         
              backgroundColor: "#FAF8FF", 
            },
          },
        }}
      >
        <MenuItem value="" sx={{ fontStyle: "normal" }}>
          ทุกสถานะ
        </MenuItem>
        <MenuItem value="active" sx={{ fontStyle: "normal" }}>
          เปิดใช้งาน
        </MenuItem>
        <MenuItem value="inactive" sx={{ fontStyle: "normal" }}>
          ปิดใช้งาน
        </MenuItem>
      </Select>
    </FormControl>
  );
}