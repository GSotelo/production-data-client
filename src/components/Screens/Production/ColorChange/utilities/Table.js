import React, { Fragment } from "react";
import Table from "../../../../UI/Table/MaterialUI/Table";

const tableRows = [
  { id: 1, date: "2021/03/17", pressure: 5.7 },
  { id: 2, date: "2021/03/18", pressure: 5.3 },
  { id: 3, date: "2021/03/19", pressure: 5.6 },
  { id: 4, date: "2021/03/20", pressure: 4.3 },
  { id: 5, date: "2021/03/21", pressure: 4.7 },
  { id: 6, date: "2021/03/22", pressure: 5.1 },
  { id: 7, date: "2021/03/23", pressure: 5.4 },
  { id: 8, date: "2021/03/24", pressure: 5.9 },
  { id: 9, date: "2021/03/25", pressure: 4.8 },
  { id: 10, date: "2021/03/26", pressure: 4.9 },
  { id: 11, date: "2021/03/27", pressure: 4.1 },
  { id: 12, date: "2021/03/28", pressure: 5.9 },
  { id: 13, date: "2021/03/29", pressure: 6.2 },
  { id: 14, date: "2021/03/30", pressure: 6.7 }
];
// const TableCCA = <Table rows={tableRows} {...propsCCAT} />;

/**
 * This component is a customization of Material UI "Table".
 * Main focus here is to create a table component for
 * number of color changes aborted (CCA). I do this in a 
 * separate file because I don't want to populate the main 
 * flow of the screen with configuration data for inner
 * components.
 */
const TableCCA = (props) => {
  const { data, ...propsCard } = props;
  console.log("DATA IN TABLE: ", data);
  return (
    <>
      <Table rows={tableRows} {...propsCard} />
    </>
  );
}

export default TableCCA;