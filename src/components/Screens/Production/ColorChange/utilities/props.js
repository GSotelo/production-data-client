import { ReactComponent as Color } from "../../../../../assets/svg/color.svg";
import { ReactComponent as Speed } from "../../../../../assets/svg/speed.svg";
import { ReactComponent as Runtime } from "../../../../../assets/svg/runtime.svg";
import { ReactComponent as Off } from "../../../../../assets/svg/off.svg";

// Props: Quickest/Longest color change
export const propsCCQL = {
  icon1: <Color />,
  icon2: <Speed />,
  title: "Quickest / Longest color change",
  type: 2
};

// Props: Color change duration
export const propsCCD = {
  icon1: <Color />,
  icon2: <Runtime />,
  title: "Color change duration",
  type: 2
};

// Props: Aborted color changes
export const propsCCA = {
  icon1: <Color />,
  icon2: <Off />,
  title: "Color changes aborted",
  type: 2
};

// Props: Aborted color changes table
export const propsCCAT = {
  columns:[
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      width: "50%"
    },
    {
      field: "pressure",
      headerName: "Pressure (bar)",
      sortable: true,
      type: "number",
      width: "50%"
    }
  ],

  pageSize:5
}
