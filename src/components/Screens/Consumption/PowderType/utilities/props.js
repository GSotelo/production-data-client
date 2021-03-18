import { ReactComponent as FreshPowder } from "../../../../../assets/svg/freshPowder.svg";


// Properties: Consumption per powder type
export const propsCPT = {
  icon: <FreshPowder />,
  title: "Consumption per powder type",
  type: 3
};

// Props: Powder type table
export const propsCPTT = {
  columns:[
    {
      field: "type",
      headerName: "Powder type",
      sortable: true,
      width: "50%"
    },
    {
      field: "consumption",
      headerName: "Consumption (kg)",
      sortable: true,
      type: "number",
      width: "50%"
    }
  ],

  pageSize:14
};
