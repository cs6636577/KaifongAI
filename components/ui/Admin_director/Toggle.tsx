import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch disableRipple {...props} />
))(() => ({
  width: 50,
  height: 28,
  padding: 0,

  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "200ms",

    "&.Mui-checked": {
      transform: "translateX(22px)", // 🔥 คำนวณให้แล้ว
      color: "#fff",

      "& + .MuiSwitch-track": {
        backgroundColor: "#FFD100",
        opacity: 1,
        border: 0,
      },
    },
  },

  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    boxShadow: "none",
  },

  "& .MuiSwitch-track": {
    borderRadius: 14,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    boxShadow: "none",
    transition: "background-color 200ms ease",
  },
}));

export default IOSSwitch;