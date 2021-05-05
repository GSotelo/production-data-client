import { ReactComponent as BatchInformation } from "../../../../../assets/svg/programEdit.svg";

export const propsTitleBarBI = {
  icon: <BatchInformation />,
  title: "Batch overview",
  type: 1
};

export const propsTableBI = {
  columns: [
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      type: "date",
      flex: 1
    },
    {
      field: "startTime",
      headerName: "Start time",
      sortable: true,
      type: "string",
      flex: 1
    },
    {
      field: "stopTime",
      headerName: "Stop time",
      sortable: true,
      type: "string",
      flex: 1
    },
    {
      field: "batchNumber",
      headerName: "Batch number",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "duration",
      headerName: "Duration",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "color",
      headerName: "Color",
      sortable: true,
      type: "string",
      flex: 1
    },
    {
      field: "parameters",
      headerName: "Parameters",
      sortable: true,
      type: "string",
      flex: 1
    }
  ],
  pageSize: 7
};

export const propsToasterDanger = [
  "Error",
  {
    description: "No data available"
  }
];