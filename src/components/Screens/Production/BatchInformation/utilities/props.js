import { ReactComponent as BatchInformation } from "../../../../../assets/svg/batch.svg";

export const propsTitleBarBO = {
  icon: <BatchInformation />,
  title: "Batch overview",
  type: 1
};

export const propsTableBO = {
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
      headerName: "Color code",
      sortable: true,
      type: "string",
      flex: 1
    }
  ],
  pageSize: 7
};

export const propsTableBP = {
  columns: [
    {
      field: "batchNumber",
      headerName: "Batch number",
      sortable: true,
      type: "string",
      flex: 1
    },
    {
      field: "air",
      headerName: "Air",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "assistAir",
      headerName: "Assist air",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "airCompensation",
      headerName: "Air compensation",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "pumpMode",
      headerName: "Pump mode",
      type: "string",
      sortable: true,
      flex: 1
    },
    {
      field: "kV",
      headerName: "kV",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "uA",
      headerName: "uA",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "afc",
      headerName: "AFC",
      sortable: true,
      type: "boolean",
      flex: 1
    },
    {
      field: "beforeSpray",
      headerName: "Before spray",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "afterSpray",
      headerName: "After spray",
      sortable: true,
      type: "number",
      flex: 1
    },
    {
      field: "enableGun",
      headerName: "Enable gun",
      sortable: true,
      type: "boolean",
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