import React from "react";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import "./Table.css";
import { Empty } from 'antd';


const Table = ({ rows, columns, pageSize, onCellDoubleClick }) => {
  return (
    <DataGrid
      components={{
        Toolbar: GridToolbar,
        // NoRowsOverlay: Empty
      }}
      columns={columns}
      className="dataTable"
      pageSize={pageSize}
      rows={rows}
      onPageChange={(params) => console.log("[onPageChange]", params)}
      onCellDoubleClick={(params) => onCellDoubleClick(params)}
      disableSelectionOnClick={true}
    />
  );
};

export default Table;