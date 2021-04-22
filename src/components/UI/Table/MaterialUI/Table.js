import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import "./Table.css";

/**
 * Material UI
 */
const Table = ({ rows, columns, pageSize }) => (
  <DataGrid
    columns={columns} 
    className="dataTable"
    pageSize={pageSize} 
    rows={rows} 
    onPageChange={(param) => console.log("changing page...", param)}
  />
);

export default Table;